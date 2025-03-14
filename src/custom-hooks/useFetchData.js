import { useState, useEffect } from "react"
import { urlApi } from "@/lib/publicVars"

export function useFetchData(endpoint) {
    const [fetchedElements, setFetchedElements] = useState([])
    const [printedElements, setPrintedElements] = useState([])
    
    const handleFetch = async () => {
        try {
            const res = await fetch(`${urlApi}/${endpoint}`)
            const { data } = await res.json()
            setFetchedElements(data)
            setPrintedElements(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetch()
    }, [])

    return { handleFetch, fetchedElements, setPrintedElements, printedElements }
}
