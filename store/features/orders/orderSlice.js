import {createSlice} from "@reduxjs/toolkit"

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        list:[]
    },
    reducers:{
        addOrder: (state,action) =>{
            state.list.push(action.payload)
        },
        updateOrderStatus:(state,action)=>{
            const {orderId, status} = action.payload
            const order = state.list.find((o)=> o.orderId === orderId)
            if(order){
                order.status = status
            }
        },
        clearOrders:(state)=>{
            state.list = []
        }
    }
})
export const {addOrder,updateOrderStatus,clearOrders} = orderSlice.actions;
export default orderSlice.reducer