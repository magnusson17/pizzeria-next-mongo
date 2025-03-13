"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { updatePizza } from "@/actions/pizzaCRUD"
import { urlApi } from "@/lib/publicVars"

export default function Pizza() {
    const { id } = useParams()
    const router = useRouter()
    const [pizza, setPizza] = useState(null)
    const [ingredients, setIngredients] = useState([])

    const fetchPizza = async () => {
        try {
            const res = await fetch(`${urlApi}/pizzas/${id}`)
            const { data } = await res.json()
            setPizza(data)
        } catch (error) {
            console.log(error)
        }
    }

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
        fetchPizza()
        fetchIngredients()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const ingredienti = formData.getAll("ingredienti").map(el => el)

        const update = await updatePizza({
            id,
            nome: formData.get("nome"),
            prezzo: formData.get("prezzo"),
            ingredienti
        })

        router.push("/admin/pizza")
    }

    if (!pizza) return <p>Loading...</p>

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="nome" defaultValue={pizza.nome} />
            <input type="number" name="prezzo" defaultValue={pizza.prezzo} />

            {ingredients.map(el => {
                return (
                    <div key={el._id}>
                        <input 
                            type="checkbox"
                            name="ingredienti"
                            value={el._id}
                            defaultChecked={pizza.ingredienti.some(ing => ing._id === el._id)}
                        />
                        <label htmlFor="ingredienti">{el.nome.it}</label>
                    </div>
                )
            })}
            <input type="submit" />
        </form>
    )
}