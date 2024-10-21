import { useReducer, useRef, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "../main/Home";
import "./App.css";

console.log(import.meta.url); // 현재 파일 경로 확인
console.log(new URL('../01_main/Home.jsx', import.meta.url)); // Home.jsx 경로 확인

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
