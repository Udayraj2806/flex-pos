import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./redux/rootReducer";

// const finalReducer = combineReducers({
//   rootReducer: rootReducer,
// });
const storedCartItems = localStorage.getItem("cartItems");
let initialCartItems;
if (storedCartItems && storedCartItems !== "undefined") {
  initialCartItems = JSON.parse(storedCartItems);
} else {
  initialCartItems = [];
}

// console.log(storedCartItems)

const initialState = {
  rootReducer: {
    cartItems: initialCartItems
  },
};

// const store = createStore(finalReducer, initialState);
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    rootReducer: {
      cartItems:initialCartItems
    },
  },
});

// useEffect(()=>{
//   setCartItem(localStorage.getItem("cartItems"))
// },[])
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
