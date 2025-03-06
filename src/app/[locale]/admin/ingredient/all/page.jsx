"use client"

import { useEffect, useState } from "react"
import { addIngredient, deleteIngredient } from "@/actions/ingredientCRUD"
import { urlApi } from "@/lib/publicVars"

export default function Ingredient() {
    // useState con "use client", GET as handler con "use server"
    const [ingredients, setIngredients] = useState([])
    
    const fetchIngredients = async () => {
        try {
            const res = await fetch(`${urlApi}/ingredients`)
            const { data } = await res.json()
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
            nome: formData.get("nome")
        })

        fetchIngredients()
    }

    const handleDelete = async id => {
        await deleteIngredient(id)
        fetchIngredients()
    }

    return (
        <div>
            {/* action quando uso "use server", onSubmit quando uso "use client" */}
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" />
                <input type="submit" />
            </form>

            <ul>
                {ingredients.map(el => {
                    return (
                        <li key={el._id}>
                            <h2>{el.nome}</h2>
                            <button onClick={() => handleDelete(el._id)}>elimina</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}