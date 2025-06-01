import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const emptyForm = {
    title: "", description: "", price: "", promoPrice: "", image: "", category: "", subcategory: "",
    manufacturer: "", sku: "", tags: "", stockCount: "", dimensions: { height: "", width: "", depth: "" },
    usageInstructions: "", hazardCodes: "", seoKeywords: "", colorCode: "", weight: "", volume: "",
    materials: "", applicationSurface: "", msdsLink: "", isBanner: false, isBestseller: false
  };

  const [form, setForm] = useState(emptyForm);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("❌ Błąd pobierania produktów:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("dimensions.")) {
      const dimKey = name.split(".")[1];
      setForm((prev) => ({ ...prev, dimensions: { ...prev.dimensions, [dimKey]: value } }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title || "", description: product.description || "",
      price: product.price?.toString() || "", promoPrice: product.promoPrice?.toString() || "",
      image: product.image || "", category: product.category || "", subcategory: product.subcategory || "",
      manufacturer: product.manufacturer || "", sku: product.sku || "", tags: product.tags?.join(", ") || "",
      stockCount: product.stockCount?.toString() || "",
      dimensions: {
        height: product.dimensions?.height?.toString() || "",
        width: product.dimensions?.width?.toString() || "",
        depth: product.dimensions?.depth?.toString() || "",
      },
      usageInstructions: product.usageInstructions || "",
      hazardCodes: product.hazardCodes?.join(", ") || "",
      seoKeywords: product.seoKeywords?.join(", ") || "",
      colorCode: product.colorCode || "", weight: product.weight || "", volume: product.volume || "",
      materials: product.materials?.join(", ") || "", applicationSurface: product.applicationSurface?.join(", ") || "",
      msdsLink: product.msdsLink || "", isBanner: product.isBanner || false, isBestseller: product.isBestseller || false
    });
  };

  const resetForm = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const saveOrUpdateProduct = async () => {
    const preparedForm = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()),
      hazardCodes: form.hazardCodes.split(",").map(t => t.trim()),
      seoKeywords: form.seoKeywords.split(",").map(t => t.trim()),
      materials: form.materials.split(",").map(t => t.trim()),
      applicationSurface: form.applicationSurface.split(",").map(t => t.trim()),
      dimensions: {
        height: parseFloat(form.dimensions.height),
        width: parseFloat(form.dimensions.width),
        depth: parseFloat(form.dimensions.depth),
      },
      price: parseFloat(form.price),
      promoPrice: form.promoPrice ? parseFloat(form.promoPrice) : null,
      stockCount: parseInt(form.stockCount)
    };

    try {
      const res = editId
        ? await axios.patch(`/api/products/${editId}`, preparedForm, { withCredentials: true })
        : await axios.post("/api/products", preparedForm, { withCredentials: true });

      setProducts(prev => editId
        ? prev.map(p => p._id === editId ? res.data : p)
        : [...prev, res.data]
      );

      resetForm();
    } catch (err) {
      console.error("❌ Błąd zapisu produktu:", err);
    }
  };

  return (
    <div className="text-yellow-300">
      <h2 className="text-2xl font-bold mb-4">{editId ? "✏️ Edytuj produkt" : "➕ Dodaj nowy produkt"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {["title", "description", "price", "promoPrice", "image", "category", "subcategory", "manufacturer", "sku", "tags", "stockCount", "colorCode", "weight", "volume", "materials", "applicationSurface", "msdsLink", "usageInstructions", "hazardCodes", "seoKeywords"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field] ?? ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border border-yellow-500 rounded px-3 py-2 w-full placeholder-yellow-400"
          />
        ))}

        {["height", "width", "depth"].map((dim) => (
          <input
            key={dim}
            name={`dimensions.${dim}`}
            placeholder={`Wymiary: ${dim}`}
            value={form.dimensions[dim] ?? ""}
            onChange={handleInputChange}
            className="bg-zinc-800 border border-yellow-500 rounded px-3 py-2 w-full placeholder-yellow-400"
          />
        ))}

        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="isBanner" checked={form.isBanner} onChange={handleInputChange} />
          Produkt na banerze
        </label>
        <label className="flex items-center gap-2 col-span-2">
          <input type="checkbox" name="isBestseller" checked={form.isBestseller} onChange={handleInputChange} />
          Bestseller
        </label>
      </div>

      <div className="flex gap-4 mb-8">
        <button onClick={saveOrUpdateProduct} className="bg-yellow-400 text-zinc-900 font-bold px-4 py-2 rounded hover:bg-yellow-300 transition">
          {editId ? "💾 Zapisz zmiany" : "✅ Dodaj produkt"}
        </button>
        {editId && (
          <button onClick={resetForm} className="bg-zinc-700 text-yellow-300 px-4 py-2 rounded hover:bg-zinc-600 transition">
            ✖️ Anuluj edycję
          </button>
        )}
      </div>

      <h2 className="text-2xl font-bold mb-4">📦 Lista produktów</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-2 shadow-lg">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
            <div className="text-lg font-bold truncate">{p.title}</div>
            <div className="text-yellow-400 text-sm">Cena: {p.price} zł</div>
            <div className="text-neutral-400 text-sm">Kolor: {p.colorCode}</div>
            {p.promoPrice && <div className="text-green-400 text-sm">Promocyjna: {p.promoPrice} zł</div>}
            <button
              onClick={() => startEdit(p)}
              className="mt-2 text-sm bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 transition"
            >
              ✏️ Edytuj
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
