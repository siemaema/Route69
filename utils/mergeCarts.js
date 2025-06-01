function mergeCarts(sessionCart, userCart) {
  const map = new Map();

  [...userCart, ...sessionCart].forEach(item => {
    const id = item.productId.toString();

    if (!map.has(id)) {
      map.set(id, { ...item });
    } else {
      const existing = map.get(id);
      existing.quantity += item.quantity;

      if (item.totalItemsPrice && existing.totalItemsPrice) {
        existing.totalItemsPrice += item.totalItemsPrice;
      }
    }
  });

  return [...map.values()];
}

module.exports = mergeCarts;
