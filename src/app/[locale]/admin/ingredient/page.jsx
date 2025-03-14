"use client"

import { addIngredient, deleteIngredient } from "@/actions/ingredientCRUD"
import { handleDelete } from "@/lib/publicFun"
import FilterContent from "@/components/FilterContent"
import { useFetchData } from "@/custom-hooks/useFetchData"

export default function Ingredient() {
    // useState con "use client", GET as handler con "use server"
    
    const { handleFetch, fetchedElements, setPrintedElements, printedElements } = useFetchData("ingredients")

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const add = await addIngredient({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en")
        })

        handleFetch()
        e.target.reset()
    }

    return (
        <div>
            {/* action quando uso "use server", onSubmit quando uso "use client" */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="titolo-it">Italiano</label>
                <input type="text" name="titolo-it" />
                <label htmlFor="titolo-en">Inglese</label>
                <input type="text" name="titolo-en" />
                <input type="submit" />
            </form>

            <FilterContent 
                fetchedElements={fetchedElements}
                setPrintedElements={setPrintedElements}
            />

            <ul>
                {printedElements.map(el => {
                    return (
                        <li key={el._id}>
                            <h2>{el.titolo.it}</h2>
                            <button onClick={() => handleDelete(el._id, deleteIngredient, handleFetch)}>elimina</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}