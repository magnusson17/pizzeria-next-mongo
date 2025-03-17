"use server"

import { GET as handlerFoods } from "@/app/api/foods/route"
import { Fragment } from "react"

export default async function Page({ params }) {
    const { locale } = await params

    const res = await handlerFoods()
    const { data } = await res.json()

    const sortedFoodsByPrice = data.sort((a, b) => a.prezzo - b.prezzo)

    const group = new Map()
    
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

    const IngredientName = ({ ing, isLast }) => {
        return <li>{locale === "it" ? ing.titolo.it : ing.titolo.en}{!isLast && ",\u00A0"}</li>
    }

    return (
        <div className="page-food">
            <h1>Cibi</h1>

            <div>
                {[...group].map(tip => {
                    return (
                        <div key={tip[0]._id} className="page-food__macro-sect">
                            <h2 className="page-food__type-title">{tip[0].titolo.it}</h2>

                            {tip[1].map((content, index) => {
                                return (
                                    <Fragment key={content._id}>
                                        {/* stampo il prezzo se l'el prima NON ha un prezzo =, o se l'el è il 1o el */}
                                        {((tip[1][index - 1] && tip[1][index].prezzo !== tip[1][index - 1].prezzo) || index === 0) ? <h2 className="page-food__price">{content.prezzo} &euro;</h2> : ''}

                                        <h3>{content.titolo.it}</h3>
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