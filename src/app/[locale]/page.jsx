import { useTranslations } from 'next-intl'
import Image from 'next/image'

export async function generateStaticParams() {
    return [{ locale: "it" }, { locale: "en" }]
}

export default function Home() {
    const t = useTranslations('Home')

    return (
        <div className='homepage'>
            <div className='homepage__intro'>
                <Image 
                    className='homepage__wrapper-img-intro' 
                    src="/imgs/pizza-scaled.jpg"
                    alt='pizza'
                    width="1920" 
                    height="1080"
                />
            </div>
            <div className='homepage__main page'>
                <h1>{t('titolo')}</h1>
            </div>
        </div>
    )
}