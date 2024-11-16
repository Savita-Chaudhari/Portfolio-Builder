import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioCard from "./components/portfolioCard";
import store from './redux/store';
import Home from './components/home.jsx';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <ToastContainer></ToastContainer>
        <Routes>
          <Route path="/portfolio" element={<PortfolioCard />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;