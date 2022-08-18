import LandingPage from "./views/landingpage/LandingPage";
import RegisterPage from './views/registerpage/RegisterPage';
import NavbarTest from "./components/globalComponents/navTest/NavbarTest";
import LoginPage from "./views/loginpage/LoginPage";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import HowItWorksPage from "./views/howitworks/HowItWorksPage";
import SupportPage from "./views/support/SupportPage";
import CommunityPage from "./views/community/CommunityPage";
import MealsPage from "./views/mealspage/MealsPage";
import React, { useState, useEffect } from "react";
import CartPage from "./views/cartpage/CartPage";
import Footer from "./components/globalComponents/footer/Footer";
import './App.css'

export const MyContext = React.createContext();

function App() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState(cartItems);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(""); 

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      setIsLoggedIn(true);
      setToken(data.token);
      setUserId(data.id);
    }
  }, [])

  useEffect(()=>{
   localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])

useEffect(()=>{
  fetch(process.env.REACT_APP_SERVER_URL + "/meals")
  .then(res=>res.json())
.then(data=>{
 setMeals(data)
})
},[])

/* const logOut = ()=>{
  setUser("")
}
 */

  return (

    <MyContext.Provider value={{ meals, setMeals, cart, setCart, orders, setOrders, user, setUser, token, setToken, isLoggedIn, setIsLoggedIn }}>
      <div className='App'>
        <HashRouter>
          <NavbarTest isLogged={isLoggedIn} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/howitworks" element={<HowItWorksPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer/>

        </HashRouter>
      </div>
    </MyContext.Provider>
  );
}

export default App;
