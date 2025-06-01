import ProductList from "../components/ProductList";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import {
  setProductFilters,
  setProductSort,
} from "../store/features/products/productsSlice";

import { ChevronDown, ChevronUp } from "lucide-react";

export default function SearchingPage() {
  const dispatch = useDispatch();
  const { category = "wszystkie", subcategory = null } = useParams();
  const location = useLocation();
  const { list = [], sort } = useSelector((state) => state.product);

  const grouped = useMemo(() => {
    const acc = {};
    list.forEach((item) => {
      const cat = item.category?.toLowerCase();
      const sub = item.subcategory?.toLowerCase();
      if (!cat) return;
      if (!acc[cat]) acc[cat] = new Set();
      if (sub) acc[cat].add(sub);
    });
    return acc;
  }, [list]);

  const [openCategory, setOpenCategory] = useState(
    category?.toLowerCase() || null
  );

  useEffect(() => {
    dispatch(
      setProductFilters({
        category: category?.toLowerCase() || null,
        subcategory: subcategory?.toLowerCase() || null,
      })
    );
  }, [category, subcategory, dispatch]);

  return (
    <div className="min-h-screen flex gap-10 pt-10">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="min-w-[260px] max-w-[300px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-zinc-900 rounded-2xl p-6 mb-8 shadow-xl"
        >
          <h3 className="font-bold text-xl text-yellow-400 mb-4">Kategorie</h3>

          <div className="space-y-4">
            <Link
              to="/category/wszystkie"
              className="block px-3 py-2 mb-4 text-yellow-500 hover:text-yellow-100 hover:bg-zinc-800 rounded font-bold"
            >
              Wszystkie produkty
            </Link>

            {Object.entries(grouped).map(([cat, subs]) => {
              const isActive = openCategory === cat;
              const isSelected = category?.toLowerCase() === cat;

              return (
                <div key={cat}>
                  <button
                    onClick={() => setOpenCategory(isActive ? null : cat)}
                    className={`w-full flex justify-between items-center text-left font-semibold px-2 py-1 rounded 
                      ${
                        isSelected
                          ? "bg-yellow-500 text-black"
                          : "text-yellow-300 hover:bg-zinc-800"
                      }`}
                  >
                    <span className="capitalize">{cat}</span>
                    {isActive ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {isActive && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {[...subs].map((sub) => {
                        const isSubSelected = location.pathname.includes(sub);
                        return (
                          <li key={sub}>
                            <Link
                              to={`/category/${cat}/${sub}`}
                              className={`block px-2 py-1 rounded text-sm capitalize
                                ${
                                  isSubSelected
                                    ? "text-yellow-100 font-medium bg-yellow-400/10"
                                    : "text-yellow-200 hover:text-yellow-100"
                                }`}
                            >
                              {sub}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.aside>

      {/* Products */}
      <main className="flex-1 pr-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-2xl text-yellow-400 font-bold capitalize">
            Produkty: {category}
          </h1>
        </motion.div>

        <div className="mb-6 flex justify-end">
          <select
            onChange={(e) => dispatch(setProductSort(e.target.value))}
            className="bg-zinc-800 border border-yellow-500 text-yellow-300 rounded px-3 py-2"
            value={sort}
          >
            <option value="default">Sortowanie</option>
            <option value="price_asc">Cena: rosnąco</option>
            <option value="price_desc">Cena: malejąco</option>
            <option value="newest">Najnowsze</option>
          </select>
        </div>

        <ProductList />
      </main>
    </div>
  );
}
