import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     totalItem: localStorage.getItem("totalItem")
          ? JSON.parse(localStorage.getItem("totalItem"))
          : 0,
};
export const cartSlice = createSlice({
     name: "cart",
     initialState: initialState,
     reducers: {
          // add cart
          addCart: (state, actions) => {

          },
          // remove cart
          removeCart: (state, actions) => {

          },
          // reset cart
          resetCart: (state) => {

          }

     }


});

export const { addCart, removeCart, resetCart } = cartSlice.actions

export default cartSlice.reducer