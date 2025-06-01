import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToSessionCart,
  removeFromSessionCart,
  updateSessionCartItem,
  clearSessionCart,
} from "../store/features/session/sessionSlice";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const sessionCart = useSelector((state) => state.session.sessionCart);

  const totalPrice = sessionCart.reduce((sum, item) => {
  const price = Number(item.promoPrice || item.price);
  return sum + price * item.quantity;
}, 0);


  if (sessionCart.length === 0) {
    return (
      <div className="text-center text-yellow-400 mt-16 text-xl">
        Twój koszyk jest pusty.{" "}
        <Link to="/products" className="underline">
          Wróć do sklepu
        </Link>
      </div>
    );
  }
console.log("Dane koszyka:", sessionCart);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-zinc-900 text-yellow-200 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Twój koszyk</h2>

      <ul className="divide-y divide-zinc-700">
        {sessionCart.map((item) => (
          <li key={item._id} className="py-4 flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-yellow-300">
                {item.quantity} x {item.promoPrice || item.price} zł
              </p>
              <p className="text-sm text-yellow-300">Oceny: {item.rating}</p>
              <p className="font-bold">
                Razem:{" "}
                {(Number(item.promoPrice || item.price) * item.quantity).toFixed(2)} zł
              </p>
            </div>
            <button
              onClick={() =>
                dispatch(addToSessionCart({ ...item, quantity: 1 }))
              }
              className="text-green-400 hover:text-green-600 text-sm"
            >
              <PlusIcon />
            </button>
            <button
              onClick={() =>
                item.quantity > 1
                  ? dispatch(
                      updateSessionCartItem({
                        _id: item._id,
                        quantity: item.quantity - 1,
                      })
                    )
                  : dispatch(removeFromSessionCart(item._id))
              }
              className="text-red-300 hover:text-red-500 text-sm"
            >
              <MinusIcon />
            </button>
            <button
              onClick={() => dispatch(removeFromSessionCart(item._id))}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <h4 className="text-xl font-bold text-yellow-400">
          Łącznie: {totalPrice.toFixed(2)} zł
        </h4>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => dispatch(clearSessionCart())}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm font-semibold"
          >
            Wyczyść koszyk
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-6 py-2 rounded font-bold">
            Przejdź do płatności
          </button>
        </div>
      </div>
    </div>
  );
}
