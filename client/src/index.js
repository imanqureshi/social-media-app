import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//keeps track of store for easy access to store
import { Provider } from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

//initialize redux
const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
