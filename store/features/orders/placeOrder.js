import { addOrder } from "./orderSlice";
import { clearSessionCart } from "../session/sessionSlice";
import { generateOrderId } from "../../../utils/orderUtils";
import { calculateCartTotal } from "../../../utils/cartUtils";

export const placeOrder = () => async(dispatch,getState)=>{
    const {sessionCart,currentUser} = getState().session;
    if(sessionCart.length === 0) return;

    const newOrder ={
        orderId : generateOrderId(),
        status: "Złożone",
        date: new Date().toISOString(),
        items: sessionCart,
        totalPrice: calculateCartTotal(sessionCart)
    }
    dispatch(addOrder(newOrder));
    dispatch(clearSessionCart())
}