"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { addPizza, deletePizza } from "@/actions/pizzaCRUD"
import { handleDelete } from "@/lib/publicFun"
import { urlApi } from "@/lib/publicVars"
import FilterContent from "@/components/FilterContent"

export default function Pizza() {
    const [ingredients, setIngredients] = useState([])
    const [fetchedPizzas, setFetchedPizzas] = useState([])
    const [pizzas, setPizzas] = useState([])

    const fetchPizzas = async () => {
        try {
            const res = await fetch(`${urlApi}/pizzas`)
            const { data } = await res.json()
            setFetchedPizzas(data)
            setPizzas(data)
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

    return (
        <div className="page-admin-pizzas">
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="nome" />
                <input type="number" name="prezzo" placeholder="prezzo" />
                {ingredients.map(el => {
                    return (
                        <div key={el._id}>
                            <input type="checkbox" name="ingredienti" value={el._id} />
                            <label htmlFor="ingredienti">{el.nome.it}</label>
                        </div>
                    )
                })}
                <input type="submit" />
            </form>

            <FilterContent 
                fetchedElements={fetchedPizzas}
                setElements={setPizzas}
                hasTranslation={false}
            />

            <h1>Contenuti</h1>

            <div className="page-admin-pizzas__row">
                <div className="page-admin-pizzas__main-col">Titolo</div>
                <div className="page-admin-pizzas__secondary-col">Modifica</div>
                <div className="page-admin-pizzas__secondary-col">Elimina</div>
            </div>

            <ul>
                {pizzas.map(el => {                    
                    return (
                        <li key={el._id} className="page-admin-pizzas__row">
                            <h2 className="page-admin-pizzas__main-col">{el.nome}</h2>
                            <Link href={`/admin/pizza/${el._id}`} className="page-admin-pizzas__secondary-col">modifica</Link>
                            <div className="page-admin-pizzas__secondary-col">
                                <button onClick={() => handleDelete(el._id, deletePizza, fetchPizzas)}>cancella</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}