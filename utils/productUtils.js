export const applyFiltersAndSort = (products, filters, sort) => {
  let filtered = [...products];

  // 🔎 Kategoria
  if (filters.category && filters.category !== "wszystkie") {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // 🔎 Podkategoria
  if (filters.subcategory) {
    filtered = filtered.filter(
      (p) =>
        p.subcategory?.toLowerCase() === filters.subcategory.toLowerCase()
    );
  }

  // 🏭 Producent
  if (filters.manufacturer) {
    filtered = filtered.filter(
      (p) =>
        p.manufacturer?.toLowerCase() === filters.manufacturer.toLowerCase()
    );
  }

  // 🔍 Wyszukiwanie z wagą
  if (filters.search) {
    const term = filters.search.toLowerCase();

    filtered = filtered
      .map((p) => {
        let score = 0;

        if (p.title?.toLowerCase().includes(term)) score += 5;
        if (p.tags?.some((tag) => tag.toLowerCase().includes(term)))
          score += 4;
        if (p.manufacturer?.toLowerCase().includes(term)) score += 3;
        if (p.description?.toLowerCase().includes(term)) score += 2;
        if (p.colorCode?.toLowerCase().includes(term)) score += 1;

        return { ...p, _searchScore: score };
      })
      .filter((p) => p._searchScore > 0)
      .sort((a, b) => b._searchScore - a._searchScore);
  }

  // 🔃 Sortowanie
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    default:
      break;
  }

  return filtered;
};
