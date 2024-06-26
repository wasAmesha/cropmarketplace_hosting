import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";
import Login from "./pages/Login/Login";
import UserHomePage from "./pages/UserHomePage/UserHomePage";
import { ToastContainer } from "react-toastify";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import FooterNew from "./components/Footer/FooterNew";
import Navbar from "./components/Navbar/Navbar";
import { getCurrentUser } from "./services/userService";
import FarmerPosts from "./pages/PostsPage/FarmerPosts";
import SellerPost from "./pages/PostsPage/SellerPosts";
import DeliveryPosts from "./pages/PostsPage/DeliveryPosts";
import CartPage from "./pages/CartPage/CartPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import OfferPaymentPage from "./pages/Payment/OfferPaymentPage";
import { GetCartByUser } from "./services/cartService";
import AdminPage from "./pages/Admin/AdminPage";
import AdminLogin from "./pages/Admin/AdminLogin";
import AboutPage from "./pages/AboutPage/AboutPage";

const Layout = ({
  currentUser,
  setCurrentUser,
  cartCount,
  setCartCount,
  getCartCount,
  children,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (currentUser !== null) {
      getCartCount();
    }
  }, [currentUser, getCartCount]);

  return (
    <>
      {location.pathname !== "/cxc-admin" && location.pathname !== "/cxc-admin-dashboard" && (
        <Navbar user={currentUser} cartCount={cartCount} />
      )}
      {children}
      {location.pathname !== "/cxc-admin" && location.pathname !== "/cxc-admin-dashboard" && <FooterNew />}
    </>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = async () => {
    await GetCartByUser(currentUser._id)
      .then(({ data }) => {
        setCartCount([...data].length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <Layout
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        cartCount={cartCount}
        setCartCount={setCartCount}
        getCartCount={getCartCount}
      >
        <Routes>
          <Route path="/cxc-admin" element={<AdminLogin />} />
          <Route path="/cxc-admin-dashboard" element={<AdminPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUser={setCurrentUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={<UserHomePage getCartCount={getCartCount} />}
          />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/farmerPosts" element={<FarmerPosts />} />
          <Route path="/sellerPosts" element={<SellerPost />} />
          <Route path="/deliveryPosts" element={<DeliveryPosts />} />
          <Route
            path="/cart"
            element={<CartPage setCartCount={setCartCount} />}
          />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/offerPayment/:id/:farmerId" element={<OfferPaymentPage />} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
