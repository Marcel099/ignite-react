import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { addProductToCart } from "../store/modules/cart/actions"

import { IProduct } from "../store/modules/cart/types"

interface CatalogItemProps {
  product: IProduct
}

export function CatalogItem({ product }: CatalogItemProps) {
  const dispatch = useDispatch()

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCart(product))
  }, [dispatch])

  return (
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
  )
}