import { motion } from "framer-motion";
import { ShoppingCart } from 'lucide-react';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Bestsellers() {
  const bestsellers = useSelector((state) => state.products.items).filter((item) => item.isBestseller);
  const [showMore, setShowMore] = useState(false);

  const visibleItems = showMore ? bestsellers : bestsellers.slice(0, 8);

  return (
    <section className="mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleItems.map((prod, idx) => (
          <Link to={`/product/${prod._id}`} key={prod._id || idx}>
          <motion.div
            key={prod._id || idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.07 }}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #0006" }}
            className="bg-zinc-800 hover:bg-yellow-400/90 rounded-2xl p-5 shadow group flex items-center gap-4 transition-all cursor-pointer"
          >
            <div className="bg-zinc-900 group-hover:bg-yellow-300/70 rounded-full p-2 transition">
              <ShoppingCart className="w-6 h-6 text-yellow-400" />
            </div>
            
            <div className="flex-1">
              <div className="font-bold text-lg group-hover:text-zinc-900 text-yellow-300">{prod.title}</div>
              <div className="font-extrabold text-yellow-400 text-xl group-hover:text-zinc-900">{prod.price} zł</div>
            </div>
            
          </motion.div>
          </Link>
        ))}
      </div>

      {bestsellers.length > 8 && (
        <div key={bestsellers._id } className="text-center mt-4">
          <button
            onClick={() => setShowMore(prev => !prev)}
            className="bg-yellow-400 text-zinc-900 py-2 px-4 rounded-lg font-bold hover:bg-yellow-300 transition"
          >
            {showMore ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        </div>
      )}
    </section>
  );
}
