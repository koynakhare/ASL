import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Import css files
import store from './redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import Root from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
     <Provider store={store}>
    <Root />
    </Provider>
);
