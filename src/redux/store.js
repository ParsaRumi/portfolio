import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import {cart,profile,address } from "./reducer";
import thunk from "redux-thunk";

const middleWare = [thunk];
const reducer = combineReducers({ cart,profile,address });
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleWare)
);

export default store;
