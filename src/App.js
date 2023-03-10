import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from "./Components/Country";
import Header from "./Components/Header";
import Main from "./Components/Main";
import "./Css/global.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/CountriesAPI/" element={<Main />} />
        <Route path="/CountriesAPI/country/:name" element={<Country />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
