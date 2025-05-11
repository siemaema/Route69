import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredProducts = createSelector(
  [
    state => state.products.items,
    (state, props) => props.category,
    (state, props) => props.subcategory,
    state => state.filters.selected,
    state => state.search.term?.toLowerCase() || "",
    state => state.filters.sortOption || "none"
  ],
  (items, category, subcategory, filters, term, sortOption) => {
    const filtered = items
      .filter(p => category === "wszystkie" || p.category === category)
      .filter(p => !subcategory || p.subcategory === subcategory)
      .filter(p => {
        if (filters.includes("promo") && !p.promoPrice) return false;
        if (filters.includes("cheap") && p.price > 100) return false;
        if (filters.includes("available") && !p.inStock) return false;
        return true;
      })
      .filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "priceAsc":
          return (a.promoPrice || a.price) - (b.promoPrice || b.price);
        case "priceDesc":
          return (b.promoPrice || b.price) - (a.promoPrice || a.price);
        case "nameAsc":
          return a.title.localeCompare(b.title);
        case "nameDesc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return sorted;
  }
);
