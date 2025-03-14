import Link from "next/link";

export default function HeaderAdmin() {
    return (
        <div className="header-admin">
            <nav>
                <Link href="/admin">admin</Link>
                <Link href="/admin/food">lista cibi</Link>
                <Link href="/admin/ingredient">lista ingredienti</Link>
                <Link href="/admin/drink">lista bevande</Link>
            </nav>
        </div>
    )
}