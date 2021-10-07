import { useEffect, useState } from "react"
import api from "../services/api"
import { IProduct } from "../store/modules/cart/types"
import { CatalogItem } from "./CatalogItem"

export const Catalog: React.FC = () => {
    const [catalog,setCatalog] = useState<IProduct[]>([])

    useEffect(() => {
        api.get<IProduct[]>("products").then((products) => {
            setCatalog(products.data)
        })
    }, [])

    return (
        <main>
            <h1>Catalogo</h1>
            { catalog.map(product => <CatalogItem key={product.id} product={product} /> )}
        </main>
    )
}