import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: { signIn: "/login" }, // Redirect to login if not authenticated
});

export const config = {
    matcher: ["/admin/:path*"], // Apply middleware only to /admin routes
};
