import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/features/session/sessionThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const currentUser = useSelector((state) => state.session.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [data, setData] = useState({ email: "", password: "" });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "user",
    adress: { street: "", city: "", postalcode: "" },
    phone: "",
    paymentData: { cardNumber: "", expirationDate: "", cvv: "" },
    cart: [{}],
  });

useEffect(() => {
  if (!currentUser) return;

  if (currentUser.role === "Admin") {
    navigate("/admin");
  } else {
    navigate("/shop");
  }
}, [currentUser, navigate]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      const targetTag = e.target.tagName.toLowerCase();
      const isInput = ["input", "textarea"].includes(targetTag);
      if (e.key === "Enter" && !currentUser && isInput) {
        if (!data.email) {
          emailRef.current.focus();
          return;
        }
        if (!data.password) {
          passwordRef.current.focus();
          return;
        }
        dispatch(loginUser(data));
        toast.success("Zalogowano pomyślnie");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, data, currentUser]);

  return (
    <div className="flex w-full mx-auto max-w-6xl h-[600px] rounded-2xl overflow-hidden shadow-xl">
      {/* Lewa kolumna */}
      <div className="w-1/2 h-full relative flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="img-left"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/p1.png')" }}
            />
          ) : (
            <motion.div
              key="login-form"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 bg-neutral-800 rounded-xl p-8 w-[380px] h-[480px] flex flex-col gap-4 text-yellow-100"
            >
              <h1 className="text-2xl font-bold text-center">Logowanie</h1>
              <input
                ref={emailRef}
                type="email"
                placeholder="e-mail"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder="hasło"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <button
                className="bg-amber-600 rounded-xl p-3 mt-2"
                onClick={() => dispatch(loginUser(data))}
              >
                Zaloguj się
              </button>
              <button
                onClick={() => setIsRegistering(true)}
                className="text-sm text-yellow-300 mt-auto underline text-center"
              >
                Nie masz konta? Zarejestruj się
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Prawa kolumna */}
      <div className="w-1/2 h-full relative flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          {isRegistering ? (
            <motion.div
              key="register-form"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 bg-neutral-800 rounded-xl p-8 w-[380px] h-[520px] flex flex-col gap-4 text-yellow-100"
            >
              <h1 className="text-2xl font-bold text-center">Rejestracja</h1>
              <input
                type="text"
                placeholder="Imię"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <input
                type="text"
                placeholder="Nazwisko"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    surname: e.target.value,
                  }))
                }
              />
              <input
                type="email"
                placeholder="e-mail"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <input
                type="password"
                placeholder="hasło"
                className="bg-amber-500 rounded-xl p-3"
                onChange={(e) =>
                  setRegisterData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <button
                className="bg-amber-600 rounded-xl p-3 mt-2"
                onClick={() => dispatch(registerUser(registerData))}
              >
                Zarejestruj się
              </button>
              <button
                onClick={() => setIsRegistering(false)}
                className="text-sm text-yellow-300 mt-auto underline text-center"
              >
                Masz już konto? Zaloguj się
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="img-right"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/p1.png')" }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
