import axios from "axios";
import { updateOrderStatus, clearOrders } from "./orderSlice";

export const confirmOrderAndSave = (orderId) => async (dispatch, getState) =>{
    const {list} = getState().orders;
    const {currentUser} = getState().session;

    if(!currentUser) return;

    const order = list.find((o)=> o.orderId === orderId)
    if(!order) return;

    const finalizeOrder = {...order, status: "Opłacone"}

    try{
        await axios.patch(`/api/users/${currentUser._id}`,{
            $push: {orders: finalizeOrder}
        })
        dispatch(updateOrderStatus({orderId, status: "Opłacone"}))
        dispatch(clearOrders())
    }catch(err){
        console.error("❌ Błąd zapisu zamówienia do bazy:",err)
    }
}
export const submitGuestOrder = (guestData) => async () => {
  try {
    const res = await axios.post('/api/orders/guest', guestData, { withCredentials: true });
    alert(`Dziękujemy za zamówienie! Numer zamówienia: ${res.data.orderId}`);
  } catch (err) {
    console.error("❌ Błąd składania zamówienia gościa:", err);
    alert("Nie udało się złożyć zamówienia.");
  }
};
