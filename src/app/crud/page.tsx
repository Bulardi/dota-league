'use client'
import { useEffect, useState } from "react"
import { FetchItems, AddItems, DeleteItems } from "@/lib/firebase/firebase"
import CrudItems from "../components/CrudItems"
import { Suspense } from "react"

export default function Page() {
    const [item, setItem] = useState("")
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getItems = async () => {
            try {
                const fetchedItems = await FetchItems()
                setItems(fetchedItems)
            } catch (error) {
                console.error()
            } finally {
                setLoading(false)
            }
        }
        getItems()
    }, [])


    const handleSubmit = async (e: any) => {
        try {
            setLoading(true)
            await AddItems(item)
            const fetchedItems = await FetchItems()
            setItems(fetchedItems)
            setLoading(false)
        } catch (error) {
            console.error
        }
    }

    const handleItems = (e: any) => {
        setItem(e.target.value);
    }

    const deleteItem = async (e: any) => {
        setLoading(true)
        await DeleteItems(e.target.value)
        console.log("Izbrisan item")
        const fetchedItems = await FetchItems()
        setItems(fetchedItems)
        setLoading(false)
        console.log("refreshovana lista")
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <ul className="mb-4">
                    {loading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                        <CrudItems items={items} deleteItem={deleteItem} />
                    )}
                </ul>
                <input
                    type="text"
                    name="item"
                    placeholder="Item"
                    className="mb-4 p-2 border border-black rounded bg-white"
                    value={item}
                    onChange={handleItems}
                />
                <button onClick={handleSubmit} type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add New Item
                </button>
            </div>
        </>
    )
}