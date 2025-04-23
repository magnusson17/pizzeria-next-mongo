"use client"

import Link from "next/link"
import { addFood, deleteFood } from "@/actions/foodCRUD"
import { handleDelete } from "@/lib/publicFun"
import FilterContent from "@/components/FilterContent"
import { useFetchData } from "@/custom-hooks/useFetchData"

export default function Food() {
    const {
        handleFetch: handleFetchFoods,
        fetchedElements: fetchedElementsFoods,
        setPrintedElements: setPrintedElementsFoods,
        printedElements: printedElementsFoods
    } = useFetchData("foods")
    
    const { fetchedElements: fetchedElementsIngredient } = useFetchData("ingredients")
    const { fetchedElements: fetchedElementsFoodType } = useFetchData("food-types")

    const handleSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)

        const ingredienti = formData.getAll("ingredienti").map(el => el)
        const tipologie = formData.getAll("tipologie").map(el => el)

        const add = await addFood({
            titoloIt: formData.get("titolo-it"),
            titoloEn: formData.get("titolo-en"),
            prezzo: formData.get("prezzo"),
            ingredienti,
            tipologie
        })

        alert(add.message)

        if (add.success) {
            handleFetchFoods()
            e.target.reset()
        }
    }

    return (
        <div className="page-admin-foods">
            <form onSubmit={handleSubmit}>
                <input type="text" name="titolo-it" placeholder="titolo IT" />
                <input type="text" name="titolo-en" placeholder="titolo EN" />
                <input type="number" step="0.01" name="prezzo" placeholder="prezzo" />
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
                fetchedElements={fetchedElementsFoods}
                setPrintedElements={setPrintedElementsFoods}
            />

            <h1>Contenuti</h1>

            <div className="page-admin-foods__row">
                <div className="page-admin-foods__main-col">Titolo</div>
                <div className="page-admin-foods__secondary-col">Modifica</div>
                <div className="page-admin-foods__secondary-col">Elimina</div>
            </div>

            <ul>
                {printedElementsFoods.map(el => {                    
                    return (
                        <li key={el._id} className="page-admin-foods__row">
                            <h2 className="page-admin-foods__main-col">{el.titolo.it}</h2>
                            <Link href={`/admin/food/${el._id}`} className="page-admin-foods__secondary-col">modifica</Link>
                            <div className="page-admin-foods__secondary-col">
                                <button onClick={() => handleDelete(el._id, deleteFood, handleFetchFoods)}>cancella</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}