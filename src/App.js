import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Filter from "./components/Filter";
import Card from "./components/Card";

export default function App() {
  return (
    <div className="relative">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Filter />
              <Card />
            </>
          }
        />
      </Routes>
    </div>
  );
}
