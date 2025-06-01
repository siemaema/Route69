import axios from 'axios';
import {
  setUserSession,
  setSessionCart,
  clearAllSession,
} from '../session/sessionSlice';

// 🔁 Pobierz koszyk z sesji backendowej
export const loadCartFromSession = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/session/cart', { withCredentials: true });
    dispatch(setSessionCart(res.data));
  } catch (err) {
    console.error("❌ Błąd pobierania koszyka:", err);
  }
};

// 💾 Zapisz koszyk do sesji backendowej
export const saveCartToSession = () => async (dispatch, getState) => {
  try {
    const { sessionCart } = getState().session;
    await axios.post('/api/session/cart', sessionCart, { withCredentials: true });
  } catch (err) {
    console.error("❌ Błąd zapisu koszyka:", err);
  }
};

// 🔑 Logowanie
export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const res = await axios.post(
      '/api/users/login',
      { email, password },
      { withCredentials: true }
    );
    dispatch(setUserSession(res.data.user));
    dispatch(loadCartFromSession());
  } catch (err) {
    console.error("❌ Błąd logowania:", err);
    alert(err.response?.data?.message || "Błąd logowania");
  }
};


// 🧑‍🍼 Rejestracja
export const registerUser = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/register', userData, { withCredentials: true });
    dispatch(setUserSession(res.data.user));
    dispatch(loadCartFromSession());
  } catch (err) {
    console.error("❌ Błąd rejestracji:", err);
    alert(err.response?.data?.message || "Błąd rejestracji");
  }
};

// 🔐 Wylogowanie
export const logoutUser = () => async (dispatch, getState) => {
  try {
    await dispatch(saveCartToSession());
    await axios.post('/api/users/logout', {}, { withCredentials: true });
    dispatch(clearAllSession());
  } catch (err) {
    console.error("❌ Błąd wylogowania:", err);
  }
};

// ✏️ Aktualizacja danych użytkownika
export const updateUserData = (userData) => async (dispatch) => {
  try {
    const res = await axios.patch('/api/users/me', userData, { withCredentials: true });
    dispatch(setUserSession(res.data));
  } catch (err) {
    console.error("❌ Błąd aktualizacji danych użytkownika:", err);
    alert(err.response?.data?.message || "Błąd aktualizacji");
  }
};

// 👤 Pobierz użytkownika z sesji
export const loadUserFromBackend = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users/me', { withCredentials: true });
    dispatch(setUserSession(res.data));
    dispatch(loadCartFromSession());
  } catch (err) {
    dispatch(clearAllSession());
  }
};
