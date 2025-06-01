import axios from "axios";
import { fetchProducts } from "./productsSlice";

// ➕ Dodaj komentarz do produktu
export const addCommentToProduct = (productId, text, rating) => async (dispatch) => {
  try {
    await axios.post(`/api/products/${productId}/comments`, {
      text,
      rating
    }, { withCredentials: true });

    dispatch(fetchProducts());
  } catch (err) {
    console.error("❌ Błąd dodawania komentarza:", err);
  }
};

// ✏️ Edytuj komentarz (admin lub autor komentarza)
export const editCommentOnProduct = (productId, commentId, newText, newRating) => async (dispatch) => {
  try {
    await axios.patch(`/api/products/${productId}/comments/${commentId}`, {
      text: newText,
      rating: newRating
    }, { withCredentials: true });

    dispatch(fetchProducts());
  } catch (err) {
    console.error("❌ Błąd edytowania komentarza:", err);
  }
};

// ❌ Usuń komentarz (tylko Admin)
export const deleteCommentFromProduct = (productId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${productId}/comments/${commentId}`, {
      withCredentials: true
    });

    dispatch(fetchProducts());
  } catch (err) {
    console.error("❌ Błąd usuwania komentarza:", err);
  }
};
