"use server"

import { GET as handler } from "@/app/api/pizzas/route"
import { Fragment } from "react"

export default async function Page({ params }) {
    const { locale } = await params
    const res = await handler()
    const { data } = await res.json()
    const sortedDataByPrice = data.sort((a, b) => a.prezzo - b.prezzo)

    const IngredientName = ({ ing, isLast }) => {
        return <li>{locale === "it" ? ing.nome.it : ing.nome.en}{!isLast && ",\u00A0"}</li>
    }

    return (
        <div className="page-pizzas">
            <h1>Pizze</h1>
            <ul>
                {sortedDataByPrice.map((pizza, index) => {
                    return (
                        <Fragment key={pizza._id}>
                            {/* stampo il prezzo se l'el prima NON ha un prezzo =, o se l'el è il 1o el */}
                            { ((sortedDataByPrice[index - 1] && sortedDataByPrice[index].prezzo !== sortedDataByPrice[index - 1].prezzo) || index === 0) ? <h2 className="page-pizzas__price">{pizza.prezzo} &euro;</h2> : '' }

                            <li>
                                <h2>{ pizza.nome }</h2>
                                <ul className="page-pizzas__ingredients">
                                    {pizza.ingredienti.map((ing, index) => {
                                        return (
                                            <IngredientName 
                                                key={ing._id}
                                                ing={ing}
                                                isLast={index === pizza.ingredienti.length - 1}
                                            />
                                        )
                                    })}
                                </ul>
                            </li>
                        </Fragment>
                    )
                })}
            </ul>
        </div>
    )
}