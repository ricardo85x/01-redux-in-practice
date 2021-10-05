import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import api from "../services/api"
import { addProductToCart } from "../store/modules/cart/actions"
import { IProduct } from "../store/modules/cart/types"

export const Catalog: React.FC = () => {
    const [catalog,setCatalog] = useState<IProduct[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        api.get<IProduct[]>("products").then((products) => {
            setCatalog(products.data)
        })
        
    }, [])

    const handleAddProductToCart = useCallback((product: IProduct) => {
        dispatch(addProductToCart(product))
    }, [dispatch])

    return (
        <main>
            <h1>Catalogo</h1>
            { catalog.map(product => (
                <article key={product.id} >
                    <strong>{product.title}</strong> {" - "}
                    <span>{product.price}</span> {" "}

                    <button 
                        type="button"
                        onClick={() => handleAddProductToCart(product)}
                    >Comprar</button>
                </article>
            ))}

        </main>
    )
}