import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateCartAndSync } from "../store/slices/cartThunk";
import { getCookie } from "../utils/cookies";

export default function ProductCard({ product }) {
  const { _id, title, description, image, price, promoPrice } = product;
  const dispatch = useDispatch();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const userId = getCookie("session");

    if (!userId) {
      toast.error("Musisz być zalogowany, aby dodać do koszyka.");
      return;
    }

    try {
      await dispatch(updateCartAndSync("add", { ...product, quantity: 1 }, userId));
      toast.success(`Dodano do koszyka ${product.title}`);
    } catch (err) {
      console.error("[Błąd AddToCart]", err);
      toast.error("Nie udało się dodać do koszyka");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-zinc-900 text-yellow-400 rounded-xl shadow-lg flex flex-col w-full max-w-xs mx-auto h-[400px] overflow-hidden"
    >
      <Link
        to={`/product/${_id || title}`}
        className="w-full h-[300px] flex flex-col items-center justify-center group"
      >
        <img
          src={image || "/default-product.png"}
          alt={title}
          className="w-full h-[170px] object-cover group-hover:scale-105 transition"
        />
        <div className="flex-1 flex flex-col justify-between px-4 py-3 w-full">
          <div>
            <h3 className="font-bold text-lg truncate">{title}</h3>
            <p className="text-yellow-300/80 text-sm mt-1 h-[48px] overflow-hidden">
              {description}
            </p>
          </div>
          <div>
            <p className="font-bold text-base mt-2">
              {promoPrice ? (
                <>
                  <span className="line-through text-gray-400 mr-2">
                    {price} zł
                  </span>
                  <span className="text-yellow-300 font-extrabold">
                    {promoPrice} zł
                  </span>
                </>
              ) : (
                <span>{price} zł</span>
              )}
            </p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className="w-9/12 mx-auto mt-1 mb-3 bg-yellow-400 text-zinc-900 rounded-md py-2 font-bold hover:bg-yellow-300 transition"
        onClick={handleAddToCart}
      >
        Dodaj do koszyka
      </button>
    </motion.div>
  );
}
