"use client"

import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import IconItalyFlag from './icons/IconItalyFlag'
import IconUkFlag from './icons/IconUkFlag'

export default function SwitchLang() {
    const actualPath = usePathname()
    const locale = useLocale()

    return (
        <div className='header__comp-langs'>
            <div className='header__comp-langs-switch'>
                { locale === "it" ? <IconItalyFlag/> : <IconUkFlag/> }
            </div>

            <div className='header__comp-langs-nav'>
                <Link href={actualPath} locale="it"><IconItalyFlag/></Link> 
                <Link href={actualPath} locale="en"><IconUkFlag/></Link>
            </div>
        </div>
    )
}