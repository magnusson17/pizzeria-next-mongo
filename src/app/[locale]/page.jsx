import { useTranslations } from 'next-intl'

export default function Home() {
    const t = useTranslations('Home')

    return (
        <main>
            <h1>{t('titolo')}</h1>
        </main>
    )
}