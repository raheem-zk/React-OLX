import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { db, auth } from "./firebase/config";
import { Context, FirebaseContext } from "./store/FirebaseContext";
import Post from "./store/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseContext.Provider value={{ db, auth }}>
    <Context>
      <Post>
        <App />
      </Post>
    </Context>
  </FirebaseContext.Provider>
);
