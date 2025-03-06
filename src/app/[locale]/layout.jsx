import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import Header from "@/components/layout/Header"
import "@/lib/db.js"
import "@/assets/css/stylesheets/index.css"

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
}

export default async function RootLayout({ children, params }) {
    const { locale } = await params

    if (!routing.locales.includes(locale)) {
        notFound()
    }

    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Header />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
