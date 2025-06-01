import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { applyFiltersAndSort } from "../utils/productUtils";
import { fetchProducts } from "../store/features/products/productsSlice";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

export default function ProductList() {
  const { category = "wszystkie", subcategory = "" } = useParams();
  const dispatch = useDispatch();

  // ✅ tutaj poprawione
  const items = useSelector((state) => state.product.list || []);
  const { filters, sort } = useSelector((state) => state.product);


  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

 const filteredItems = useMemo(() => {
  const mergedFilters = {
    ...filters,
    category: category !== "wszystkie" ? category?.toLowerCase() : null,
    subcategory: subcategory?.toLowerCase() || null,
  };

  console.log("✅ Final filters used for filtering:", mergedFilters);

  return applyFiltersAndSort(items, mergedFilters, sort);
}, [items, filters, category, subcategory, sort]);


  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-5">
      {filteredItems.map((product, i) => {
        console.log("RENDERUJĘ:", product.title);
        return(<motion.div
          key={product._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>)
})}
    </div>
  );
}
