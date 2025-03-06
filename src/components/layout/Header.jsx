import Link from "next/link"
import SwitchLang from "../SwitchLang"

export default function Header() {
    return (
        <header id="header">
            <nav>
                <Link href="/">Home</Link>
                <Link href="/pizza">Pizze</Link>
            </nav>
            <SwitchLang />
        </header>
    )
}