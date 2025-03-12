"use server"

import { GET as handler } from "@/app/api/pizzas/route"

export default async function Page() {
    const res = await handler()
    const { data } = await res.json()
    const sortedDataByPrice = data.sort((a, b) => a.prezzo - b.prezzo)

    return (
        <div className="page-pizzas">
            <h1>Pizze</h1>
            <ul>
                {sortedDataByPrice.map((pizza, index) => {
                    return (
                        <>
                            {/* stampo il prezzo se l'el prima NON ha un prezzo =, o se l'el è il 1o el */}
                            { ((sortedDataByPrice[index - 1] && sortedDataByPrice[index].prezzo !== sortedDataByPrice[index - 1].prezzo) || index === 0) ? <h2 className="page-pizzas__price">{pizza.prezzo} &euro;</h2> : '' }

                            <li key={pizza._id}>
                                <h2>{ pizza.nome }</h2>
                                <ul className="page-pizzas__ingredients">
                                    {pizza.ingredienti.map((ing, index) => {
                                        return (
                                            <li key={ing._id}>
                                                {index === pizza.ingredienti.length - 1 ? <span>{ing.nome}</span> : <span>{ing.nome},&nbsp;</span>} 
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
}