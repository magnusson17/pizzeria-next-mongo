"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { addPizza, deletePizza } from "@/actions/pizzaCRUD"
import { urlApi } from "@/lib/publicVars"

export default function Pizza() {
    const [ingredients, setIngredients] = useState([])
    const [pizzas, setPizzas] = useState([])

    const fetchPizzas = async () => {
        try {
            const res = await fetch(`${urlApi}/pizzas`)
            const { data } = await res.json()
            setPizzas(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchIngredients = async () => {
        try {
            const res = await fetch(`${urlApi}/ingredients/all`)
            const { data } = await res.json()
            setIngredients(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPizzas()
        fetchIngredients()
    }, [])
    
    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const ingredienti = formData.getAll("ingredienti").map(el => el)

        const add = await addPizza({
            nome: formData.get("nome"),
            prezzo: formData.get("prezzo"),
            ingredienti
        })

        fetchPizzas()
    }

    const handleDelete = async id => {
        await deletePizza(id)
        fetchPizzas()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="nome" />
                <input type="number" name="prezzo" placeholder="prezzo" />
                {ingredients.map(el => {
                    return (
                        <div key={el._id}>
                            <input type="checkbox" name="ingredienti" value={el._id} />
                            <label htmlFor="ingredienti">{el.nome}</label>
                        </div>
                    )
                })}
                <input type="submit" />
            </form>

            <h1>Contenuti</h1>
            <ul>
                {pizzas.map(el => {
                    return (
                        <li key={el._id}>
                            <h2>{ el.nome }</h2>
                            <button onClick={() => handleDelete(el._id)}>cancella</button>
                            <Link href={`/admin/pizza/${el._id}`}>modifica</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}