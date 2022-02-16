import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from '@redux-saga/core'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ICartState } from './modules/cart/types'

import { rootReducer } from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

export interface IState {
  cart: ICartState
}

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
  )
)

sagaMiddleware.run(rootSaga)
