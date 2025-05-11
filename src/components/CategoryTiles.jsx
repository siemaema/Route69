import { Link } from "react-router-dom";
import { SprayCan, ShoppingCart, Layers, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const iconMap = {
  lakiery: <SprayCan className="w-10 h-10 text-yellow-400" />,
  podklady: <Layers className="w-10 h-10 text-yellow-400" />,
  akcesoria: <ShoppingCart className="w-10 h-10 text-yellow-400" />,
  bhp: <ShieldCheck className="w-10 h-10 text-yellow-400" />,
  wszystkie: <ShieldCheck className="w-10 h-10 text-yellow-400" />,
};

const descMap = {
  lakiery: "Wszystkie lakiery i kolory",
  podklady: "Podkłady do aut",
  akcesoria: "Maski, folie, taśmy, kubki...",
  bhp: "Ochrona i bezpieczeństwo",
  wszystkie: "Wszystkie produkty w sklepie",
};

export default function CategoryTiles() {
  const items = useSelector((state) => state.products.items);

  // Wyciągamy unikalne kategorie jako stringi
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link
          to={`/category/${cat}`}
          key={cat}
          className="group block bg-zinc-800 hover:bg-yellow-400/70 rounded-2xl p-6 shadow transition-all duration-200
      flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="mb-3 group-hover:scale-125 group-hover:drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)] transition-all">
            {iconMap[cat] || (
              <ShieldCheck className="w-10 h-10 text-yellow-400" />
            )}
          </div>
          <span className="font-bold text-lg group-hover:text-zinc-900 text-yellow-300 transition-colors duration-200">
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </span>
          <span className="text-zinc-400 group-hover:text-zinc-900 mt-2 text-sm transition-colors duration-200">
            {descMap[cat] || "Produkty tej kategorii"}
          </span>
        </Link>
      ))}

      {/* ❗ Karta „Wszystkie produkty” */}
      <Link
        to="/category/wszystkie"
        key="wszystkie"
        className="group block bg-zinc-800 hover:bg-yellow-400/70 rounded-2xl p-6 shadow transition-all duration-200
    flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl"
      >
        <div className="mb-3 group-hover:scale-125 group-hover:drop-shadow-[0_2px_8px_rgba(255,215,0,0.4)] transition-all">
          {iconMap["wszystkie"]}
        </div>
        <span className="font-bold text-lg group-hover:text-zinc-900 text-yellow-300 transition-colors duration-200">
          Wszystkie
        </span>
        <span className="text-zinc-400 group-hover:text-zinc-900 mt-2 text-sm transition-colors duration-200">
          {descMap["wszystkie"]}
        </span>
      </Link>
    </div>
  );
}
