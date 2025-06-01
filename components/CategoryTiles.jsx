import { Link } from "react-router-dom";
import {
  SprayCan,
  ShoppingCart,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const getIconComponent = (cat) => {
  const baseClass = "w-10 h-10 transition-transform duration-500 ease-in-out";
  const iconProps = {
    className: `${baseClass} text-yellow-400 group-hover:text-black group-hover:rotate-[360deg]`,
  };

  switch (cat) {
    case "lakiery":
      return <SprayCan {...iconProps} />;
    case "podklady":
      return <Layers {...iconProps} />;
    case "akcesoria":
      return <ShoppingCart {...iconProps} />;
    case "bhp":
    case "wszystkie":
    default:
      return <ShieldCheck {...iconProps} />;
  }
};

export default function CategoryTiles() {
  // ✅ Bezpiecznie upewniamy się, że items to tablica
  const rawItems = useSelector((state) => state.product.list);
  const items = Array.isArray(rawItems) ? rawItems : [];

  const categories = useMemo(() => {
    return [...new Set(items.map((item) => item.category?.toLowerCase()))].filter(Boolean);
  }, [items]);

  const tiles = [...categories, "wszystkie"];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
      {tiles.map((cat) => (
        <Link
          to={`/category/${cat}`}
          key={cat}
          className="group block bg-zinc-900 hover:bg-gradient-to-r hover:from-yellow-300 hover:to-yellow-500 rounded-2xl p-6 shadow-lg transition-all duration-300
          flex flex-col items-center justify-center text-center transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm"
        >
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-3 shadow-inner group-hover:bg-yellow-200 transition-all duration-300 ring-2 ring-yellow-300 group-hover:ring-black">
            {getIconComponent(cat)}
          </div>
          <span className="font-bold text-lg group-hover:text-zinc-900 text-yellow-300 transition-colors duration-300 capitalize">
            {cat}
          </span>
        </Link>
      ))}
    </div>
  );
}
