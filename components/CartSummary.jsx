import { useSelector } from "react-redux";

export default function CartSummary() {
  const sessionCart = useSelector((state) => state.session.sessionCart);

  const total = sessionCart.reduce((acc, item) => {
    const price = item.promoPrice || item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="bg-zinc-900 text-yellow-400 rounded-xl p-4 shadow-md mt-4">
      <div className="font-bold mb-2">Koszyk</div>
      <ul className="mb-2 space-y-1">
        {sessionCart.map((item, idx) => (
          <li key={idx} className="flex justify-between">
            <span>{item.title} x{item.quantity}</span>
            <span>{((item.promoPrice || item.price) * item.quantity).toFixed(2)} zł</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-yellow-600 pt-2 font-bold flex justify-between">
        <span>Razem:</span>
        <span>{total.toFixed(2)} zł</span>
      </div>
    </div>
  );
}
