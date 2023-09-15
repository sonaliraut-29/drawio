import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunkMiddleware from "redux-thunk";

const reducer = combineReducers({});

export default (initialState) =>
  createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
