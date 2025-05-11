import CategoryTiles from "../components/CategoryTiles";
import Banner from "../components/Banner";
import Bestsellers from "../components/BestSellers";
import WhyUsBoxes from "../components/WhyUsBoxes";
import { Link } from "react-router-dom";

export default function ShopPage1() {
  return (
    <div>
      <Banner />

      <section className="mt-8 text-center bg-black/80 rounded-xl p-3 shadow-lg">
        <h2 className="text-yellow-400 text-2xl font-bold mb-4">
          Kategorie produktów
        </h2>
        <CategoryTiles />
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-yellow-400 text-2xl font-bold mb-4">
          Najczęściej kupowane
        </h2>
        <Bestsellers />
      </section>

      <section className="mt-12 text-center">
        <h2 className="text-yellow-400 text-2xl font-bold mb-4">
          Dlaczego Route69?
        </h2>
        <WhyUsBoxes />
      </section>
    </div>
  );
}
