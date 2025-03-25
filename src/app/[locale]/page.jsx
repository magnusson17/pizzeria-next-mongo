import { useTranslations } from 'next-intl'

export async function generateStaticParams() {
    return [{ locale: "it" }, { locale: "en" }]
}

export default function Home() {
    const t = useTranslations('Home')

    return (
        <main>
            <h1>{t('titolo')}</h1>
        </main>
    )
}