import { useReducer, useRef, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "../01_main/Home.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
