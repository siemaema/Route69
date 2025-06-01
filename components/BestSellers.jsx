import { useSelector } from "react-redux";
import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function BestSellers() {
  const items = useSelector((state) => state.product.list);

  const bestsellers = useMemo(() => 
    Array.isArray(items) ? items.filter(p => p.isBestseller) : [], 
  [items]);

  if (!bestsellers.length) return null;

  return (
    <div className="w-full py-10">
      <h2 className="text-yellow-400 text-3xl font-bold mb-6 text-center">
        Najlepiej sprzedające się
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {bestsellers.map((product, i) => (
          <motion.div
            key={product._id || i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
