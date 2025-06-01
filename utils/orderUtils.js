export const generateOrderId = () =>{
  const timestamp = Date.now().toString(36); // np. "l7j3hs5"
  const random = Math.random().toString(36).substring(2, 6); // np. "h2f9"
  return `ORD-${timestamp}-${random}`.toUpperCase(); // "ORD-L7J3HS5-H2F9"
}