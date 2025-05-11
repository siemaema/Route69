import axios from "axios";
import {
  addToCart,
  removeFromCart,
  increseQuantity,
  decreseQuantity,
  setCartFromServer,
  clearCart,
} from "./cartSlice";

export const updateCartAndSync = (actionType, payload) => async (dispatch, getState) => {
  try {
    switch (actionType) {
      case "add":
        dispatch(addToCart({ ...payload, quantity: 1 }));
        break;
      case "remove":
        dispatch(removeFromCart(payload));
        break;
      case "increase":
        dispatch(increseQuantity(payload));
        break;
      case "decrease":
        dispatch(decreseQuantity(payload));
        break;
      case "clear":
        dispatch(clearCart());
        break;
      default:
        console.warn("Nieznana akcja koszyka:", actionType);
        return;
    }

    const { user, cart } = getState();
    const userId = user.currentUser?.id;

    if (!userId) {
      console.log("Brak użytkownika — pomijam synchronizację");
      return;
    }

    console.log("Synchronizacja koszyka z serwerem...");
    await axios.patch(`http://localhost:5000/users/${userId}`, {
      cart: cart.items,
    });
    console.log("Synchronizacja zakończona");
  } catch (err) {
    console.error("Błąd podczas synchronizacji koszyka:", err);
    // Możesz tu dodać toast lub alert
  }
};

export const loadCartFromUser = () => (dispatch, getState) => {
  const { currentUser } = getState().user;
  if (currentUser?.cart) {
    dispatch(setCartFromServer(currentUser.cart));
  }
};
