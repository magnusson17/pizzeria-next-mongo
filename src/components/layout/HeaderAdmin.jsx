import Link from "next/link";

export default function HeaderAdmin() {
    return (
        <div className="header-admin">
            <nav>
                <Link href="/admin">admin</Link>
                <Link href="/admin/food">cibi</Link>
                <Link href="/admin/ingredient">ingredienti</Link>
                <Link href="/admin/drink">bevande</Link>
                <Link href="/admin/food-type">tipologie cibo</Link>
            </nav>
        </div>
    )
}