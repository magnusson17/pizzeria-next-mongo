"use client"

import { Link, usePathname } from '@/i18n/navigation'

export default function SwitchLang() {
    const actualPath = usePathname()

    return (
        <div>
            <Link href={actualPath} locale="it">IT</Link>
            <span>/</span>
            <Link href={actualPath} locale="en">EN</Link>
        </div>
    )
}