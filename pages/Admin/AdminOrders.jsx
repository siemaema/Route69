import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", { withCredentials: true });

        // ✅ Bezpieczne mapowanie
        const guestOrders = Array.isArray(res.data.guestOrders)
          ? res.data.guestOrders.map((o) => ({ ...o, type: "Gość" }))
          : [];

        const userOrders = Array.isArray(res.data.userOrders)
          ? res.data.userOrders.flatMap((user) =>
              Array.isArray(user.orders)
                ? user.orders.map((order) => ({
                    ...order,
                    userName: `${user.name} ${user.surname}`,
                    userEmail: user.email,
                    type: "Użytkownik",
                  }))
                : []
            )
          : [];

        setOrders([...guestOrders, ...userOrders]);
      } catch (err) {
        console.error("❌ Błąd ładowania zamówień:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(
        `/api/orders/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? res.data : order))
      );
    } catch (err) {
      console.error("❌ Błąd zmiany statusu:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Wszystkie zamówienia</h2>
      <ul>
        {orders.map((order, i) => (
          <li key={order._id || i} className="border p-3 mb-2 rounded">
            <div>
              <strong>
                {order.userName || order.fullName || "Brak imienia"}
              </strong>{" "}
              ({order.type})
            </div>
            <div>Status: {order.status}</div>
            <div>Cena: {order.totalPrice} zł</div>
            {order.userEmail && <div>Email: {order.userEmail}</div>}
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="mt-2"
            >
              <option>Oczekujące</option>
              <option>W trakcie</option>
              <option>Zrealizowane</option>
              <option>Anulowane</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
