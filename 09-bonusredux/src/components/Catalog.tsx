import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { api } from "../services/axios"
import { addProductToCart } from "../store/modules/cart/actions"

interface IProduct {
  id: number
  title: string
  price: number
}

export function Catalog() {
  const dispatch = useDispatch()
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data)
    })
  }, [])

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product))
  }, [dispatch])

  return (
    <>
      <h1>Catalog</h1>
      {catalog.map(product => (
        <article key={product.id}>
          <strong>{product.title} - </strong>
          <span>{product.price}</span>

          <button
            type="button"
            onClick={() => handleAddProductToCart(product)}
          >
            Comprar
          </button>
        </article>
      ))}
    </>
  )
}