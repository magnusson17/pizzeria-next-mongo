"use client"

import Link from "next/link"
import { addPizza, deletePizza } from "@/actions/foodCRUD"
import { handleDelete } from "@/lib/publicFun"
import FilterContent from "@/components/FilterContent"
import { useFetchData } from "@/custom-hooks/useFetchData"

export default function Food() {
    const { 
        handleFetch: handleFetchPizza,
        fetchedElements: fetchedElementsPizza,
        setPrintedElements: setPrintedElementsPizza,
        printedElements: printedElementsPizza 
    } = useFetchData("foods")
    
    const { 
        fetchedElements: fetchedElementsIngredient,
    } = useFetchData("ingredients")
    
    const { 
        fetchedElements: fetchedElementsFoodType,
    } = useFetchData("food-types")

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const ingredienti = formData.getAll("ingredienti").map(el => el)
        const tipologie = formData.getAll("tipologie").map(el => el)

        const add = await addPizza({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo"),
            ingredienti,
            tipologie
        })

        alert(add.message)

        if (add.success) {
            handleFetchPizza()
            e.target.reset()
        }
    }

    return (
        <div className="page-admin-pizzas">
            <form onSubmit={handleSubmit}>
                <input type="text" name="titolo-it" placeholder="titolo IT" />
                <input type="text" name="titolo-en" placeholder="titolo EN" />
                <input type="number" name="prezzo" placeholder="prezzo" />
                <div>Ingredienti</div>
                {fetchedElementsIngredient.map(el => {
                    return (
                        <div key={el._id}>
                            <input type="checkbox" name="ingredienti" value={el._id} />
                            <label htmlFor="ingredienti">{el.titolo.it}</label>
                        </div>
                    )
                })}
                <div>Tipologie</div>
                {fetchedElementsFoodType.map(el => {
                    return (
                        <div key={el._id}>
                            <input type="checkbox" name="tipologie" value={el._id} />
                            <label htmlFor="tipologie">{el.titolo.it}</label>
                        </div>
                    )
                })}
                <input type="submit" />
            </form>

            <FilterContent 
                fetchedElements={fetchedElementsPizza}
                setPrintedElements={setPrintedElementsPizza}
            />

            <h1>Contenuti</h1>

            <div className="page-admin-pizzas__row">
                <div className="page-admin-pizzas__main-col">Titolo</div>
                <div className="page-admin-pizzas__secondary-col">Modifica</div>
                <div className="page-admin-pizzas__secondary-col">Elimina</div>
            </div>

            <ul>
                {printedElementsPizza.map(el => {                    
                    return (
                        <li key={el._id} className="page-admin-pizzas__row">
                            <h2 className="page-admin-pizzas__main-col">{el.titolo.it}</h2>
                            <Link href={`/admin/pizza/${el._id}`} className="page-admin-pizzas__secondary-col">modifica</Link>
                            <div className="page-admin-pizzas__secondary-col">
                                <button onClick={() => handleDelete(el._id, deletePizza, handleFetchPizza)}>cancella</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}