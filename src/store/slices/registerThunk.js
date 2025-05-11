import axios from "axios";
import { registerRequest, registerSuccess, registerFailure } from "./userSlice";

const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const registerUser = (data) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const existingUser = await axios.get(
      `http://localhost:5000/users?email=${data.email}`
    );
    if (existingUser.data.length > 0) {
      dispatch(registerFailure("Użytkownik o tym adresie e-mail już istnieje"));
      return;
    }
    const response = await axios.post("http://localhost:5000/users", data);
    const user = response.data;
    if (user) {
      setCookie("session", user.id);
      dispatch(registerSuccess(user));
    }
  } catch (err) {
    dispatch(registerFailure(err.message));
  }
};
