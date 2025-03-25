"use client"

import { useFetchData } from "@/custom-hooks/useFetchData"
import { addDrink, deleteDrink } from "@/actions/drinkCRUD"
import FilterContent from "@/components/FilterContent"
import { handleDelete } from "@/lib/publicFun"
import Link from "next/link"

export default function Drink() {
    const { handleFetch, fetchedElements, setPrintedElements, printedElements } = useFetchData("drinks")

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const add = await addDrink({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo")
        })

        handleFetch()
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
                fetchedElements={fetchedElements}
                setPrintedElements={setPrintedElements}
            />

            <ul>
                {printedElements.map(drink => {
                    return (
                        <li key={drink._id}>
                            <h2>{drink.titolo.it}</h2>
                            <Link href={`/admin/drink/${drink._id}`}>Modifica</Link>
                            <button onClick={() => handleDelete(drink._id, deleteDrink, handleFetch)}>elimina</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}