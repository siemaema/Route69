export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + (item.totalItemsPrice || 0);
  }, 0);
};