"use client"

import { useParams } from "next/navigation"
import { useTranslations } from 'next-intl'
import Link from "next/link"
import SwitchLang from "../SwitchLang"

export default function Header() {
    const { locale } = useParams()
    const t = useTranslations('Header')

    return (
        <header id="header">
            <nav>
                <Link href={`/${locale}`} className="label label--small">Home</Link>
                <Link href={`/${locale}/food`} className="label label--small">{t('food')}</Link>
                <Link href={`/${locale}/drink`} className="label label--small">{t('drinks')}</Link>
            </nav>
            <SwitchLang />
        </header>
    )
}