"use server"

import { GET as handler } from "@/app/api/drinks/route"

export async function generateStaticParams() {
    return [{ locale: "it" }, { locale: "en" }]
}

export default async function Page({ params }) {
    const { locale } = await params

    const res = await handler()
    const { data } = await res.json()

    const drinkSortedByPrice = data.sort((a, b) => a.prezzo - b.prezzo)

    return (
        <div className="page-drink page">
            <h1>Bevande</h1>
            <ul>
                {drinkSortedByPrice.map(drink => {
                    return (
                        <li key={drink._id}>{drink.titolo[locale]}</li>
                    )
                })}
            </ul>
        </div>
    )
}