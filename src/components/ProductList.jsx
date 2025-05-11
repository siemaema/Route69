import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectFilteredProducts } from "../store/slices/selectors.js";
import { fetchProducts } from "../store/slices/productSlice.js"; // <-- to dodaj
import { motion } from "framer-motion";
import { useEffect } from "react";


export default function ProductList() {
  const { category = "wszystkie", subcategory = "" } = useParams();
  const dispatch = useDispatch();

  
  const items = useSelector((state) => state.products.items || []);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const filteredItems = useSelector((state) =>
  selectFilteredProducts(state, { category, subcategory })
);


  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-5">
      {filteredItems.map((product, i) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
