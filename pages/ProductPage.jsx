import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MinusIcon, PlusIcon, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { addToSessionCart } from "../store/features/session/sessionSlice";
import {
  addCommentToProduct,
  editCommentOnProduct,
  deleteCommentFromProduct,
} from "../store/features/products/productCommentThunk";

export default function ProductPage() {
  const { _id } = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isEditingId, setIsEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const user = useSelector((state) => state.session.currentUser);
  const isAdmin = user?.role === "Admin";
  const products = useSelector((state) => state.product.list || []);
  const product = products.find((item) => String(item._id) === String(_id));

  if (!product) {
    return <div className="text-red-500">Nie znaleziono produktu.</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToSessionCart({ ...product, quantity }));
    toast.success(`Dodano ${product.title} x${quantity} do koszyka`);
  };

  const handleAddComment = () => {
    if (!comment.trim() || rating < 1 || rating > 5) {
      toast.error("Wprowadź treść i ocenę (1–5)");
      return;
    }
    dispatch(addCommentToProduct(_id, comment, rating));
    toast.success("Komentarz dodany");
    setComment("");
    setRating(0);
  };

  const handleEditComment = (commentId) => {
    if (!editedText.trim() || editedRating < 1 || editedRating > 5) {
      toast.error("Popraw tekst i ocenę (1–5)");
      return;
    }
    dispatch(editCommentOnProduct(_id, commentId, editedText, editedRating));
    toast.success("Komentarz zaktualizowany");
    setIsEditingId(null);
    setEditedText("");
    setEditedRating(0);
  };

  const comments = Array.isArray(product.comments) ? product.comments : [];


  return (
    <div className="p-6 max-w-4xl mx-auto rounded-2xl bg-neutral-900 text-neutral-100">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-96 h-96 object-cover rounded-xl border border-neutral-700"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-2 text-yellow-500">
            {product.title}
          </h1>
          <p className="text-neutral-300 mb-4">{product.description}</p>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl font-bold text-yellow-400">
              {product.promoPrice || product.price} zł
            </span>
            {product.promoPrice && (
              <span className="text-sm line-through text-neutral-500">
                {product.price} zł
              </span>
            )}
            <span className="text-sm text-yellow-300">
              Ocena: {product.rating?.toFixed(1) || 0}/5
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="p-1 border rounded border-yellow-500"
            >
              <MinusIcon size={16} />
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 border rounded border-yellow-500"
            >
              <PlusIcon size={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-lg shadow"
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Komentarze</h2>

        {user ? (
          <div className="bg-neutral-800 p-4 rounded-xl shadow-md mb-6">
            <textarea
              className="w-full p-2 bg-neutral-900 border border-yellow-500 text-white rounded focus:ring-2 focus:ring-yellow-500"
              placeholder="Napisz komentarz"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl transition-transform hover:scale-110 ${
                    star <= rating ? "text-yellow-400" : "text-neutral-500"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={handleAddComment}
              className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded font-bold"
            >
              Dodaj komentarz
            </button>
          </div>
        ) : (
          <p className="text-neutral-400">Zaloguj się, aby dodać komentarz.</p>
        )}

        {comments.map((c) => {
          const canEdit = user && (isAdmin || c.userId === user.id);
          const isEditing = isEditingId === c._id;

          return (
            <div
              key={c._id}
              className="bg-neutral-800 text-neutral-100 p-4 rounded-xl border border-neutral-700 shadow-md mb-4"
            >
              <p className="font-semibold text-yellow-300">{c.author}</p>
              {isEditing ? (
                <>
                  <textarea
                    className="w-full mt-2 p-2 bg-neutral-900 border border-yellow-500 text-white rounded"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <div className="flex items-center gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setEditedRating(star)}
                        className={`cursor-pointer text-2xl hover:scale-110 transition-transform ${
                          star <= editedRating
                            ? "text-yellow-400"
                            : "text-neutral-500"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEditComment(c._id)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded"
                    >
                      Zapisz
                    </button>
                    <button
                      onClick={() => setIsEditingId(null)}
                      className="text-red-400 hover:underline"
                    >
                      Anuluj
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-2 text-neutral-300">{c.text}</p>
                  <p className="text-yellow-400">Ocena: {c.rating}/5</p>
                  {canEdit && (
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => {
                          setIsEditingId(c._id);
                          setEditedText(c.text);
                          setEditedRating(c.rating);
                        }}
                        className="flex items-center gap-1 text-blue-400 hover:underline"
                      >
                        <Pencil size={16} /> Edytuj
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteCommentFromProduct(_id, c._id));
                          toast.info("Komentarz usunięty");
                        }}
                        className="flex items-center gap-1 text-red-500 hover:underline"
                      >
                        <Trash2 size={16} /> Usuń
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
