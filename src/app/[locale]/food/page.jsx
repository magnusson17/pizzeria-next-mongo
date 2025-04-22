"use server"

import { GET as handlerFoods } from "@/app/api/foods/route"
import { Fragment } from "react"

export async function generateStaticParams() {
    return [{ locale: "it" }, { locale: "en" }]
}

export default async function Page({ params }) {
    const { locale } = await params

    const res = await handlerFoods()
    const { data } = await res.json()

    const sortedFoodsByPrice = data.sort((a, b) => a.prezzo - b.prezzo)

    const group = new Map()
    
    // raggruppo i contenuti in un map dove ogni chiave è l'obj contenene i dati del food type
    sortedFoodsByPrice.forEach(food => {
        food.tipologie.forEach(tip => {
            let existingKey = [...group.keys()].find(
                key => key._id === tip._id
            )
            
            if (!existingKey) {
                group.set(tip, [])
                existingKey = tip
            }
            group.get(existingKey).push(food)
        })
    })

    // piccolo component che stampa ogni singolo ingrediente
    const IngredientName = ({ ing, isLast }) => {
        return <li>{ing.titolo[locale]}{!isLast && ",\u00A0"}</li>
    }

    return (
        <div className="page-food">
            <h1>Cibi</h1>

            <div>
                {[...group].map(tip => {
                    return (
                        // l'obj key del map è ora trasformata nel 1o el dell'array
                        <div key={tip[0]._id} className="page-food__macro-sect">
                            <h2 className="page-food__type-title title">{tip[0].titolo[locale]}</h2>

                            {/* l'array value del map è ora trasformato nel 2o el dell'array */}
                            {tip[1].map((content, index) => {
                                return (
                                    <Fragment key={content._id}>
                                        {/* stampo il prezzo se l'el prima NON ha un prezzo =, o se l'el è il 1o el */}
                                        {((tip[1][index - 1] && tip[1][index].prezzo !== tip[1][index - 1].prezzo) || index === 0) ? <h2 className="page-food__price label">{content.prezzo} &euro;</h2> : ''}

                                        <h3 className="label label--red">{content.titolo[locale]}</h3>
                                        <ul className="page-food__ingredients">
                                            {content.ingredienti.map((ing, index) => {
                                                return (
                                                    <IngredientName
                                                        key={ing._id}
                                                        ing={ing}
                                                        isLast={index === content.ingredienti.length - 1}
                                                    />
                                                )
                                            })}
                                        </ul>
                                    </Fragment>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}