import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const user = useSelector((state) => state.session.currentUser);
  const location = useLocation();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "Admin") return <Navigate to="/shop" />;

  const navItems = [
    { to: "/admin/orders", label: "📦 Zamówienia" },
    { to: "/admin/users", label: "👥 Użytkownicy" },
    { to: "/admin/products", label: "🛠️ Produkty" },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-yellow-300 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-widest text-yellow-400">
          PANEL ADMINA
        </h1>
        <Link to="/shop">
          <button className="bg-yellow-400 text-zinc-900 px-4 py-2 rounded hover:bg-yellow-300 transition font-semibold">
            Powrót do sklepu
          </button>
        </Link>
      </div>

      <nav className="flex gap-4 mb-10 border-b border-yellow-500 pb-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`px-4 py-2 rounded-lg font-bold transition duration-200 ${
                isActive
                  ? "bg-yellow-400 text-zinc-900 shadow"
                  : "bg-zinc-800 hover:bg-yellow-300 hover:text-zinc-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
