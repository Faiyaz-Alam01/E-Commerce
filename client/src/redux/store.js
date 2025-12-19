import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        user : authReducer,
        product: productReducer,
        category: categorySlice,
    },
});