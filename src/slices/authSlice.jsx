import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     token: localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : null,
     loading: false
};

export const authSlice = createSlice({
     name: "auth",
     initialState: initialState,
     reducers: {
          setToken: (state, value) => {
               state.token = value.payload;
          },
          setLoading: (state, value) => {
               state.loading = value.payload;
          }
     },
});

export const { setToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
