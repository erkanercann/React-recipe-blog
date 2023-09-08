import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecipesProvider } from './context/recipes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <RecipesProvider>
            <App />
        </RecipesProvider>
    </BrowserRouter>
);
