import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categorySlice from "./slices/categoriesSlice";
import whishlistSlice from "./slices/wishlistSlice";
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import sessionStorage from 'redux-persist/es/storage/session';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    category: categorySlice,
    wishlist:whishlistSlice,
});

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);;


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }), 

});

export const persistor = persistStore(store);