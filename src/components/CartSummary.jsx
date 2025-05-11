export default function CartSummary() {
    const demoCart = [
      { name: 'Lakier XYZ', price: 45 },
      { name: 'Polerka ABC', price: 140 },
    ];
    const total = demoCart.reduce((acc, prod) => acc + prod.price, 0);
    return (
      <div className="bg-zinc-900 text-yellow-400 rounded-xl p-4 shadow-md mt-4">
        <div className="font-bold mb-2">Koszyk</div>
        <ul className="mb-2 space-y-1">
          {demoCart.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price} zł</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-yellow-600 pt-2 font-bold flex justify-between">
          <span>Razem:</span>
          <span>{total} zł</span>
        </div>
      </div>
    );
  }
  