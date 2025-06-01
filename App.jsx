import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCartFromSession,
  loadUserFromBackend,
} from "./store/features/session/sessionThunk";

import MainLayout from "./pages/MainLayout";
import LandingPage from "./components/LandingPage";
import ShopPage1 from "./pages/Shoppage1";
import ProductPage from "./pages/ProductPage";
import SearchingPage from "./pages/SearchingPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import UserInfoPage from "./pages/UserInfoPage";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import PolitykaRODO from "./pages/PolitykaRODO";
import Platnosci from "./pages/Platnosci";
import Dostawa from "./pages/Dostawa";
import Kontakt from "./pages/Kontakt";
import Reklamacje from "./pages/Reklamacje";

export default function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.session);

  // 🔁 Po odpaleniu aplikacji: załaduj usera z backendu (jeśli jest w cookies)
  useEffect(() => {
    dispatch(loadUserFromBackend());
  }, [dispatch]);

  // 🔁 Jeśli user jest zalogowany, scal koszyk z backendowym
  useEffect(() => {
    if (currentUser) {
      dispatch(loadCartFromSession());
    }
  }, [dispatch, currentUser]);

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
        <Route path="/rodo" element={<PolitykaRODO/>}/>
        <Route path="/platnosci" element={<Platnosci/>}/>
        <Route path="/dostawa" element={<Dostawa/>}/>
        <Route path="/kontakt" element={<Kontakt/>}/>
        <Route path="/reklamacje" element={<Reklamacje/>}/>
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="orders" />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
