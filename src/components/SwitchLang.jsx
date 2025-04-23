"use client"

import { Link, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'
import { useState, useRef } from 'react'

import { gsap } from "gsap"
import { useGSAP } from '@gsap/react';

import IconItalyFlag from './icons/IconItalyFlag'
import IconUkFlag from './icons/IconUkFlag'

gsap.registerPlugin(useGSAP)

export default function SwitchLang() {
    // path/locale
    const actualPath = usePathname()
    const locale = useLocale()
    
    // useRef
    const refCompLangs = useRef()
    const refNav = useRef()

    // useState
    const [isOpen, setIsOpen] = useState(false)

    // gsap
    const tlMain = gsap.timeline()
    const { contextSafe } = useGSAP({scope: refCompLangs})

    const handleToggleNav = contextSafe(() => {
        if (!isOpen) {
            tlMain.to(refNav.current, {
                x: "0%",
                duration: .5,
                ease: 'circ.inout',
            })
            .to(".header__comp-langs-nav a", {
                opacity: 1,
                pointerEvents: "all",
                duration: .3,
                stagger: .1,
                ease: 'circ.inout',
            })
            setIsOpen(true)
        } else {
            tlMain.to(".header__comp-langs-nav a", {
                opacity: 0,
                pointerEvents: "none",
                duration: .3,
                stagger: {
                    each: .1,
                    from: "end",
                },
                ease: 'circ.inout',
            })
            .to(refNav.current, {
                x: "100%",
                duration: .5,
                ease: 'circ.inout',
            })
            setIsOpen(false)
        }
    })

    return (
        <div ref={refCompLangs} className='header__comp-langs'>
            <div onClick={handleToggleNav} className='header__comp-langs-switch'>
                { locale === "it" ? <IconItalyFlag/> : <IconUkFlag/> }
            </div>

            <div ref={refNav} className='header__comp-langs-nav'>
                <Link onClick={handleToggleNav} href={actualPath} locale="it"><IconItalyFlag/></Link> 
                <Link onClick={handleToggleNav} href={actualPath} locale="en"><IconUkFlag/></Link>
            </div>
        </div>
    )
}