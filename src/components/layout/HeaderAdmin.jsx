import Link from "next/link";

export default function HeaderAdmin() {
    return (
        <div className="header-admin">
            <nav>
                <Link href="/admin">admin</Link>
                <Link href="/admin/pizza/all">lista pizze</Link>
                <Link href="/admin/ingredient/all">lista ingredienti</Link>
            </nav>
        </div>
    )
}