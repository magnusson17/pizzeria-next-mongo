"use server"

import { GET as handler } from "@/app/api/pizzas/route"

export default async function Page() {
    const res = await handler()
    const { data } = await res.json()

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <ul>
                {data.map(el => {
                    return (
                        <li key={el._id}>
                            <h2>{ el.nome }</h2>
                            <ul>
                                {el.ingredienti.map(el => {
                                    return (
                                        <li key={el._id}>{el.nome}</li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}