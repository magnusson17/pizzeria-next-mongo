"use client"

import { useEffect, useState } from "react"
import { addDrink, deleteDrink } from "@/actions/drinkCRUD"
import FilterContent from "@/components/FilterContent"
import { handleDelete } from "@/lib/publicFun"
import { urlApi } from "@/lib/publicVars"

export default function Drink() {
    const [fetchedDrinks, setFetchedDrinks] = useState([])
    const [drinks, setDrinks] = useState([])

    const fetchDrinks = async () => {
        try {
            const res = await fetch(`${urlApi}/drinks`)
            const { data } = await res.json()
            setFetchedDrinks(data)
            setDrinks(data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchDrinks()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(formData.get("titolo-it"))

        const add = addDrink({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo")
        })

        fetchDrinks()
    }

    return (
        <div>
            <h1>HI</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="titolo-it" />
                <input type="text" name="titolo-en" />
                <input type="number" name="prezzo" />
                <input type="submit" />
            </form>
    
            <FilterContent
                fetchedElements={fetchedDrinks}
                setElements={setDrinks}
                hasTranslation={true}
            />

            <ul>
                {drinks.map(drink => {
                    return (
                        <li key={drink._id}>
                            <h2>{drink.titolo.it}</h2>
                            <button onClick={() => handleDelete(drink._id, deleteDrink, fetchDrinks)}>elimina</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}