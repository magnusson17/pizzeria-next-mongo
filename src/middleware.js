import createMiddleware from "next-intl/middleware"
import { withAuth } from "next-auth/middleware"
import { locales, defaultLocale } from "@/i18n/routing"

// prendo la locale dal url, se è presente vado avanti altrimenti redirect usando locale default
const localeMiddleware = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
    localeDetection: false,
})

// al success chiamo localeMiddleware
const authMiddleware = withAuth(
    function onSuccess(req) {
        return localeMiddleware(req)
    },
    {
        pages: {
            signIn: "/login"
        }
    }
)

// grazie a un regex o chiamo solo localeMiddleware o chiamo authMiddleware (la quale chiama a sua volta localeMiddleware)
export default function middleware(req) {
    const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$"
    const publicPathnameRegex = RegExp(excludePattern, "i")
    const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname)

    if (isPublicPage) {
        return localeMiddleware(req)
    } else {
        return (authMiddleware)(req)
    }
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
}