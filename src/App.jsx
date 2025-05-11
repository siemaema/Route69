import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import LandingPage from "./components/LandingPage";
import ShopPage1 from "./pages/Shoppage1";
import ProductPage from "./pages/ProductPage";
import SearchingPage from "./pages/SearchingPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import UserInfoPage from "./pages/UserInfoPage";
import { checkSession } from "./store/slices/loginThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartFromCookies } from "./utils/cart";
import { setCartFromServer } from "./store/slices/cartSlice"; // ⬅️ UPEWNIJ SIĘ, że masz ten import

export default function App() {
  const dispatch = useDispatch();

  // ✅ 1. Check session once on mount
  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  // ✅ 2. Load cart from cookies (only once) if user is not logged in
  useEffect(() => {
    const cookieCart = getCartFromCookies();
    if (cookieCart.length > 0) {
      dispatch(setCartFromServer(cookieCart));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/shop" element={<ShopPage1 />} />
        <Route path="/products" element={<SearchingPage />} />
        <Route path="/product/:_id" element={<ProductPage />} />
        <Route path="/category/:category" element={<SearchingPage />} />
        <Route
          path="/category/:category/:subcategory?"
          element={<SearchingPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserInfoPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
