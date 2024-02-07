import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter  as Router} from "react-router-dom";
import { Provider} from "react-redux";
import { store } from "./features/store";



export  const ROOT_URL = 'http://localhost:3333'
export const selectRootUrl = (state) => state.config.ROOT_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);


