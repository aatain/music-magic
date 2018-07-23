import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StateContext from './store.jsx'

render(
    <StateContext.EnhancedProvider>
        <App />
    </StateContext.EnhancedProvider>
    , document.getElementById('root'));
registerServiceWorker();