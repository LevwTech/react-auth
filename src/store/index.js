import { createStore } from "redux";
import types from "./actionTypes";
const initialState = {
  token: null,
  isLoggedIn: false,
};
function reducer(state = { initialState }, action) {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, token: action.payload, isLoggedIn: true };
    case types.LOGOUT:
      return { ...state, token: null, isLoggedIn: false };
    default:
      return state;
  }
}
const store = createStore(reducer);
export default store;
