import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ShoppingCart } from "lucide-react";
import { addToSessionCart } from "../store/features/session/sessionSlice";
import dayjs from "dayjs";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.session.currentUser?._id);

  const { _id, title, description, image, price, promoPrice, isBestseller, createdAt } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToSessionCart({ ...product, quantity: 1 }));
    toast.success(`Dodano do koszyka: ${title}`);
  };

  const shortDesc = description?.slice(0, 70) || "Brak opisu produktu.";

  const isNew = dayjs().diff(dayjs(createdAt), "day") <= 14;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative bg-zinc-800 text-yellow-300 rounded-2xl shadow-md flex flex-col transition overflow-hidden hover:shadow-yellow-500/10"
    >
      <Link to={`/product/${_id}`} className="flex flex-col h-full">
        <div className="relative">
          <img
            src={image || "/default-product.png"}
            alt={title}
            className="w-full h-52 object-cover rounded-t-2xl"
          />

          {/* Badge'y */}
          {isBestseller && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold rounded shadow">
              Bestseller
            </span>
          )}
          {isNew && (
            <span className="absolute top-2 right-2 bg-green-500 text-black px-2 py-1 text-xs font-bold rounded shadow">
              Nowość
            </span>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
            <p className="text-yellow-200 text-sm mt-1 line-clamp-2">
              {shortDesc}
            </p>
          </div>

          <div className="mt-3">
            {promoPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-yellow-300">{promoPrice} zł</span>
                <span className="text-sm line-through text-gray-400">{price} zł</span>
              </div>
            ) : (
              <span className="text-lg font-bold">{price} zł</span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={handleAddToCart}
        className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-2 font-semibold flex items-center justify-center gap-2 transition"
      >
        <ShoppingCart className="w-4 h-4" /> Dodaj do koszyka
      </button>
    </motion.div>
  );
}
