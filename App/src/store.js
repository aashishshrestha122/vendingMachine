import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import promise from 'redux-promise-middleware';

import rootReducer from "./redux/reducers";

const initialState = {};

const middlewares = [thunk, promise];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	initialState,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
