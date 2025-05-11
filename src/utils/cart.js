
export const getCartFromCookies = () => {
  try {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cart="));
    if (!cookie) return [];

    const json = decodeURIComponent(cookie.split("=")[1]);
    return JSON.parse(json);
  } catch {
    return [];
  }
};

// Zapisywanie koszyka do cookies
export const saveCartToCookies = (cart) => {
  const expires = new Date(Date.now() + 864e5).toUTCString(); // 1 dzień
  const encoded = encodeURIComponent(JSON.stringify(cart));
  document.cookie = `cart=${encoded}; expires=${expires}; path=/`;
};

// Czyszczenie cookies
export const clearCartCookies = () => {
  document.cookie = "cart=; Max-Age=0; path=/";
};

// Merge dwóch koszyków: z cookies i z bazy
export const mergeCarts = (cookieCart, serverCart) => {
  const mergedMap = new Map();

  [...(serverCart || []), ...(cookieCart || [])].forEach((item) => {
    if (mergedMap.has(item._id)) {
      const existing = mergedMap.get(item._id);
      existing.quantity += item.quantity;
      existing.totalItemPrice += item.totalItemPrice;
    } else {
      mergedMap.set(item._id, { ...item });
    }
  });

  return Array.from(mergedMap.values());
};
