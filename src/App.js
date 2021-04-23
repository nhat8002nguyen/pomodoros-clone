import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="header-line"></div>
      <Main />
    </div>
  );
};

export default App;
