"use client"

import { useEffect, useState } from "react"
import { addIngredient, deleteIngredient } from "@/actions/ingredientCRUD"
import { handleDelete } from "@/lib/publicFun"
import { urlApi } from "@/lib/publicVars"
import FilterContent from "@/components/FilterContent"

export default function Ingredient() {
    // useState con "use client", GET as handler con "use server"
    const [fetchedingredients, setFetchedIngredients] = useState([])
    const [ingredients, setIngredients] = useState([])
    
    const fetchIngredients = async () => {
        try {
            const res = await fetch(`${urlApi}/ingredients`)
            const { data } = await res.json()
            setFetchedIngredients(data)
            setIngredients(data)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        fetchIngredients()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const add = await addIngredient({
            it: formData.get("nome-it"),
            en: formData.get("nome-en")
        })

        fetchIngredients()
        e.target.reset()
    }

    return (
        <div>
            {/* action quando uso "use server", onSubmit quando uso "use client" */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome-it">Italiano</label>
                <input type="text" name="nome-it" />
                <label htmlFor="nome-en">Inglese</label>
                <input type="text" name="nome-en" />
                <input type="submit" />
            </form>

            <FilterContent 
                fetchedElements={fetchedingredients}
                setElements={setIngredients}
                hasTranslation={true}
            />

            <ul>
                {ingredients.map(el => {
                    return (
                        <li key={el._id}>
                            <h2>{el.nome.it}</h2>
                            <button onClick={() => handleDelete(el._id, deleteIngredient, fetchIngredients)}>elimina</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}