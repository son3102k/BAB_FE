import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ProductProvider} from "./components/UserPurchase/Context"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ProductProvider>
            <App/>
        </ProductProvider>
    </React.StrictMode>
);


