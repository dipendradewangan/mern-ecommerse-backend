import { createStore, combineReducers, applyMiddleware } from "redux";
import { productReducer } from "./reducers/productReducer";
import thunk from 'redux-thunk'

const reducer = combineReducers({
    product : productReducer
})

const initialState = {}
const middleware = [thunk]

export const store = createStore(reducer, initialState, applyMiddleware(...middleware ))