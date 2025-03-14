"use client"

import { useState } from "react"

export default function FilterContent({ fetchedElements, setPrintedElements }) {
    const [search, setSearch] = useState("")

    const filterContent = e => {
        const val = e.target.value
        setSearch(val)

        if (val === "") {
            setPrintedElements(fetchedElements)
        } else {
            setPrintedElements(fetchedElements.filter( ing => ing.titolo.it.toLowerCase().includes(val) ))
        }
    }

    return (
        <div>
            <label>Filtra per nome contenuto</label>
            <input type="text" value={search} onChange={filterContent} />
        </div>
    )
}