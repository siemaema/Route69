import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../store/slices/cartSlice";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCartAndSync } from "../store/slices/cartThunk";
export default function ProductPage() {
  const { _id } = useParams(); 
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  }

  const handleAdd = () =>{
      dispatch(updateCartAndSync("add",{...product, quantity}));
      
      toast.success(`Dodano do koszyka ${product.title} ilość :${quantity}` )
    }

  const products = useSelector((state) => state.products.items);
  const product = products.find((item) => String(item._id) === _id);
  const comments =
    products.find((item) => String(item._id) === _id)?.comments || []; 
  if (!product) {
    return (
      <div className="text-red-500 text-xl mt-8">Nie znaleziono produktu.</div>
    );
  }

  return (
    <div className="flex flex-col max-w-4xl  mx-4">
      <div className="max-w-4xl bg-zinc-900 text-yellow-400 rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 mt-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-[350px] h-[350px] object-cover rounded-xl"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold">{product.name}</h2>
            <p className="text-yellow-300/80 mt-4">{product.description}</p>
            <div className="mt-6">
              <p className="font-bold text-lg mt-4">
                Oceny : {product.rating} / 5
              </p>
              {product.promoPrice ? (
                <div>
                  <span className="line-through text-zinc-400 mr-3 text-lg">
                    {product.price} zł
                  </span>
                  <span className="text-yellow-400 text-2xl font-bold">
                    {product.promoPrice} zł
                  </span>
                  <span className="ml-4 px-3 py-1 rounded bg-yellow-200/70 text-yellow-900 font-bold text-sm">
                    PROMOCJA
                  </span>
                </div>
              ) : (
                <span className="text-yellow-400 text-2xl font-bold">
                  {product.price} zł
                </span>
              )}
            </div>
          </div>
          <span><h2 className="mb-2">Ilość : {quantity} </h2><button onClick={()=> handleIncrement()}><PlusIcon/></button> <button onClick={()=> handleDecrement()}><MinusIcon/></button></span>
          <button onClick={()=> handleAdd()} className="mt-10 w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-900 rounded-lg py-3 text-lg font-bold transition">
            Dodaj do koszyka
          </button>
        </div>
      </div>
      <div>
        <h3 className="mt-4 bg-yellow-400 rounded-lg h-10 text-center py-auto text-3xl">Sekcja komentarzy</h3>
        {comments.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-zinc-800 text-yellow-400 rounded-xl shadow-lg p-4 mt-4"
            >
              <h4 className="text-xl font-bold">{item.author}</h4>
              <p className="text-yellow-300/80 mt-2">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
