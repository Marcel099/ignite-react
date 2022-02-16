import { Provider } from 'react-redux'

import { store } from './store';

import { Catalog } from './components/Catalog';
import { Cart } from './components/Cart';

export function App() {
  return (
    <Provider store={store}>
      <Catalog />
      <Cart />
    </Provider>
  );
}
