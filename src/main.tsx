import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { configureStore } from 'app/store';
import { App } from './app';
import { ConnectedRouter } from 'connected-react-router';

// prepare store
export const history = createBrowserHistory();
console.log(history)
const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ConnectedRouter history={history}>
        <App />
     </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);



 
