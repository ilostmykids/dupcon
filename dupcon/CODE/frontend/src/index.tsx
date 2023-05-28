import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './firebase/firebase'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
                <Provider store={store}>
                  <PersistGate persistor={persistor}>
                    <App />
                  </PersistGate>
                </Provider> 
              </BrowserRouter>
);

