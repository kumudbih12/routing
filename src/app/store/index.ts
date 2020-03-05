import { Store, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { apis } from 'app/middleware/apis';

import { rootReducer } from 'app/reducers';
import { RootState } from 'app/reducers/state';

import { history } from '../../main';
import { routerMiddleware } from 'connected-react-router';

export function configureStore(initialState?: RootState) {
  let middleware = applyMiddleware( apis, thunk,routerMiddleware(history));

  const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(persistedReducer as any, initialState as any, middleware) as Store<
    RootState
  >;

  const persistor = persistStore(store)
  

  if (module.hot) {
    module.hot.accept('app/reducers', () => {
      const nextReducer = require('app/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return { store, persistor };
}
