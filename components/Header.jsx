import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/features/products/productsSlice";

import { logoutUser } from "../store/features/session/sessionThunk";
import { useState } from "react";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.session.currentUser);
  const [toggleOptions, setToggleOptions] = useState(false);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    const term = e.target.value;
    setInput(term);
    dispatch(setSearch(term));
    if (!location.pathname.startsWith("/category")) {
      navigate("/category/wszystkie");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-950 shadow-xl flex items-center px-6 py-3 gap-6">
      <Link to="/shop" className="flex items-center gap-2">
        <img src="/image.png" alt="Route69" className="h-20 rounded shadow" />
      </Link>
      <div className="font-black text-3xl text-yellow-400 tracking-widest flex-1">
        ROUTE69
      </div>
      <div>
        <marquee
  behavior="scroll"
  direction="left"
  scrollamount="8"
  className="text-yellow-400 text-md font-semibold py-1"
>
  🔥 Darmowa dostawa od 199 zł! ⏰ Zamówienia do 15:00 = wysyłka dzisiaj! 🎁 Sprawdź nasze promocje tygodnia!
</marquee>

      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onFocus={() => {
          if (!location.pathname.startsWith("/category")) {
            navigate("/category/wszystkie");
          }
        }}
        placeholder="Wyszukaj produkt"
        className="px-4 py-2 rounded bg-zinc-800 text-yellow-300 border border-yellow-500 w-80 mr-4 focus:outline-yellow-400"
      />

      {user ? (
        <div className="relative inline-block">
          <img
            src="/p1.png"
            className="size-14 rounded-full cursor-pointer"
            onClick={() => setToggleOptions(!toggleOptions)}
          />
          {toggleOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-lg p-4 z-50">
              <Link
                to="/profile"
                className="block text-yellow-400 hover:text-yellow-200 mb-2"
                onClick={() => setToggleOptions(false)}
              >
                Profil
              </Link>
              <Link
                to="/orders"
                className="block text-yellow-400 hover:text-yellow-200 mb-2"
                onClick={() => setToggleOptions(false)}
              >
                Zamówienia
              </Link>
              <button
                className="block text-yellow-400 hover:text-yellow-200"
                onClick={() => {
                  setToggleOptions(false);
                  dispatch(logoutUser());
                  navigate("/login");
                }}
              >
                Wyloguj się
              </button>
              {user.role === "Admin" && (
                <Link
                  to="/admin/orders"
                  className="block text-yellow-400 hover:text-yellow-200 mt-2"
                  onClick={() => setToggleOptions(false)}
                >
                  Panel administratora
                </Link>
              )}
            </div>
          )}
        </div>
      ) : (
        <Link to={"/login"}>
          <button className="text-yellow-400 font-bold hover:text-yellow-200 transition">
            Zaloguj się
          </button>
        </Link>
      )}

      <Link to="/cart" className="ml-3 relative group">
        <svg
          className="w-7 h-7 text-yellow-400 group-hover:text-yellow-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.8a1 1 0 00.95-1.3L17 13M7 13V6m0 0L5.4 3M7 6h10"
          />
        </svg>
      </Link>
    </header>
  );
}
