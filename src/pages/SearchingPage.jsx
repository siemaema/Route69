import ProductList from "../components/ProductList";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toggleFilter } from "../store/slices/filterSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSortOption } from "../store/slices/filterSlice.js";
const filters = [
  { label: "Promocje", name: "promo" },
  { label: "Tylko dostępne", name: "available" },
  { label: "Cena < 100 zł", name: "cheap" },
];

export default function SearchingPage() {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filters.selected || []);
  const { category } = useParams();
  const items = useSelector((state) => state.products.items || []);

  // Grupowanie kategorii i podkategorii
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = new Set();
    acc[item.category].add(item.subcategory);
    return acc;
  }, {});

  const [openCategory, setOpenCategory] = useState(category || null);

  return (
    <div className="min-h-screen flex gap-10 pt-8">
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="min-w-[260px] max-w-[300px]"
      >
        {/* Kategorie i podkategorie */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-zinc-900 rounded-2xl p-6 mb-8 shadow-xl"
        >
          <Link to={"/category/wszystkie"}>
            <h3 className="font-bold text-xl text-yellow-400 mb-4">
              Kategorie
            </h3>
          </Link>
          {Object.entries(grouped).map(([cat, subs]) => (
            <div key={cat} className="mb-3">
              <button
                onClick={() =>
                  setOpenCategory(openCategory === cat ? null : cat)
                }
                className="w-full text-left font-bold text-yellow-300 hover:text-yellow-100"
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>

              {openCategory === cat && (
                <ul className="pl-4 mt-2 space-y-1">
                  {[...subs].map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/category/${cat}/${sub}`}
                        className="text-yellow-200 hover:text-yellow-100 block"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </motion.div>

        {/* Filtry */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.33 }}
          className="bg-zinc-900 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="font-bold text-xl text-yellow-400 mb-4">Filtry</h3>
          <ul className="space-y-2">
            {filters.map((f, i) => (
              <motion.li
                key={f.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.41 + i * 0.07 }}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-yellow-400 w-5 h-5"
                    checked={selectedFilters.includes(f.name)}
                    onChange={() => dispatch(toggleFilter(f.name))}
                  />
                  <span className="text-yellow-200">{f.label}</span>
                </label>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.aside>

      {/* Produkty */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mb-6"
        >
          <h1 className="text-2xl text-yellow-400 font-bold">
            Produkty: {category || "Wszystkie"}
          </h1>
        </motion.div>
        <div className="mb-4 flex justify-end">
          <select
            onChange={(e) => dispatch(setSortOption(e.target.value))}
            className="bg-zinc-800 border border-yellow-500 text-yellow-300 rounded px-3 py-2"
            defaultValue="none"
          >
            <option value="none">Sortowanie</option>
            <option value="priceAsc">Cena: rosnąco</option>
            <option value="priceDesc">Cena: malejąco</option>
            <option value="nameAsc">Nazwa A-Z</option>
            <option value="nameDesc">Nazwa Z-A</option>
          </select>
        </div>
        <ProductList />
      </main>
    </div>
  );
}
