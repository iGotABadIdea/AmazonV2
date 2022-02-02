import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => { 
            state.items = [...state.items, action.payload]
        },
        removeFromCart: (state, action) => { 
            const index = state.items.findIndex((cartItem) => cartItem.id === action.payload.id);
            let newCart = [...state.items];
            if (index >= 0) {
                newCart.splice(index, 1)
            }
            else {
                console.warn(`Cant't Remove RPoduct (id: ${action.payload.id}) as its not in there`);
            }
            state.items = newCart
        },
    },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
//Selector - this is how we have to pull info from the global store of slice
export const selectItems = (state) => state.cart.items;
export const selectTotal = (state) => state.cart.items.reduce((total, item) => total + item.price, 0);
export default cartSlice.reducer;