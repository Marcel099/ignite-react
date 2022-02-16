import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'

import { api } from '../../../services/axios'

import { IState } from '../..'
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions'
import { ActionTypes } from './types'

interface IStockResponse {
  id: number
  quantity: number
}

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

function* checkProductStock({ payload }: CheckProductStockRequest) {
  console.log(payload)

  const { product } = payload

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(
      item => item.product.id === product.id
    )?.quantity ?? 0
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get, `stock/${product.id}`
  )

  if (availableStockResponse.data.quantity > currentQuantity) {
    console.log('deu certo')
    yield put(addProductToCartSuccess(product))
  } else {
    console.log('falta de estoque')
    yield put(addProductToCartFailure(product.id))
  }

  console.log(currentQuantity)

  console.log('Adicionou produto ao carrinho')
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])
