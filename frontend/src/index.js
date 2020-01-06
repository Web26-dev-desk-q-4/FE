import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./reducers";
import { setToken } from "./utils/token";
import { loadState, saveState } from "./hooks/useLocalStorage";
import 'bootstrap/dist/css/bootstrap.min.css';


const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, setToken)
);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    tickets: store.getState().tickets,
    isLoggedIn: store.getState().isLoggedIn,
    categories: store.getState().categories
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
