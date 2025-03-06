import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const locales = ['it', 'en']
export const defaultLocale = 'it'

export const routing = defineRouting({
    locales: locales,
    defaultLocale: defaultLocale
})
