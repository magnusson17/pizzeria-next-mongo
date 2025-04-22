"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import SwitchLang from "../SwitchLang"

export default function Header() {
    const { locale } = useParams()

    return (
        <header id="header">
            <nav>
                <Link href={`/${locale}`} className="label label--small">Home</Link>
                <Link href={`/${locale}/food`} className="label label--small">Cibi</Link>
                <Link href={`/${locale}/drink`} className="label label--small">Bevande</Link>
            </nav>
            <SwitchLang />
        </header>
    )
}