import { createStore, applyMiddleware, compose } from "redux";
import { rootReducers } from "../reducers/index";
import thunk from "redux-thunk";
const saveToLoacalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState)
  } catch (e) {
    console.log(e)
  }
};

const loadFromLocalStorage = (state) => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const peristedState = loadFromLocalStorage();



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(
      rootReducers,peristedState,
  composeEnhancer(applyMiddleware(thunk))
);
store.subscribe(() => {
  saveToLoacalStorage(store.getState());
});
export default store;
