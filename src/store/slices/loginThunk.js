// store/slices/loginThunk.js
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "./userSlice";
import { setCartFromServer } from "./cartSlice";

import {
  getCartFromCookies,
  saveCartToCookies,
  mergeCarts,
  clearCartCookies,
} from "../../utils/cart";
import {
  setCookie,
  getCookie,
  removeCookie,
} from "../../utils/cookies";
import { toast } from "react-toastify";

// LOGIN
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const res = await axios.get("http://localhost:5000/users");

    const user = res.data.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      dispatch(loginFailure("Nieprawidłowe dane logowania"));
      toast.error("Nieprawidłowy e-mail lub hasło");
      return;
    }

    // Połącz koszyk z cookies z tym z serwera
    const cookieCart = getCartFromCookies();
    const serverCart = user.cart || [];
    const mergedCart = mergeCarts(cookieCart, serverCart);

    // Zapisz połączony koszyk do backendu
    await axios.patch(`http://localhost:5000/users/${user.id}`, {
      cart: mergedCart,
    });

    // Zapisz sesję
    setCookie("session", user.id);
    saveCartToCookies(mergedCart);
    clearCartCookies();

    // Usuń cart z usera i zapisz w Redux
    const { cart, ...userWithoutCart } = user;
    dispatch(loginSuccess(userWithoutCart));
    dispatch(setCartFromServer(mergedCart));

    toast.success(`Witaj ponownie, ${user.name || "użytkowniku"}!`);
  } catch (err) {
    console.error("Błąd logowania:", err);
    dispatch(loginFailure("Wystąpił problem z logowaniem"));
    toast.error("Błąd połączenia z serwerem");
  }
};

// LOGOUT
export const logoutUser = () => async (dispatch, getState) => {
  const { user, cart } = getState();
  const userId = user.currentUser?.id;

  try {
    if (userId) {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: cart.items,
      });
    }
  } catch (err) {
    console.error("Błąd zapisu koszyka przy wylogowaniu:", err);
  }

  removeCookie("session");
  dispatch(logout());
};

// SESSION CHECK
export const checkSession = () => async (dispatch) => {
  const sessionId = getCookie("session");
  if (!sessionId) return;

  try {
    const res = await axios.get(`http://localhost:5000/users/${sessionId}`);
    const user = res.data;

    if (!user?.id) {
      dispatch(logout());
      return;
    }

    const { cart, ...userWithoutCart } = user;
    dispatch(loginSuccess(userWithoutCart));
    dispatch(setCartFromServer(cart || []));
  } catch (err) {
    console.error("Błąd podczas sprawdzania sesji:", err);
    dispatch(logout());
  }
};
