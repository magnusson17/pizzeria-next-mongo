"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import SwitchLang from "../SwitchLang"

export default function Header() {
    const { locale } = useParams()

    return (
        <header id="header">
            <nav>
                <Link href={`/${locale}`}>Home</Link>
                <Link href={`/${locale}/pizza`}>Pizze</Link>
            </nav>
            <SwitchLang />
        </header>
    )
}