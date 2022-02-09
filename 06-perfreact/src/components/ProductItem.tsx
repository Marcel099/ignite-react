import { memo, useState, lazy } from 'react'
import lodash from 'lodash'

const AddProductToFavList = lazy(async () => {
  return import('./AddProductToFavList')
    .then(module => ({default: module.AddProductToFavList}))
})

interface ProductItemProps {
  product: {
    id: number
    price: number
    priceFormatted: string
    title: string
  }
  onAddToFavList: (id: number) => void
}

function ProductItemComponent({ product, onAddToFavList }: ProductItemProps) {
  const [isAddingToFavList, setIsAddingToFavList] = useState(false)


  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button type="button" onClick={() => setIsAddingToFavList(true)}>
        Adicionar aos favoritos
      </button>

      { isAddingToFavList === true && (
        <AddProductToFavList
          onAddToFavList={() => onAddToFavList(product.id)}
          onRequestClose={() => setIsAddingToFavList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => lodash.isEqual(prevProps.product, nextProps.product)
)
