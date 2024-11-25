import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from './features/auth/authSlice'
import favouritesReducer  from './features/favorites/favoriteSlice'
import cartSliceReducer from '../redux/features/cart/cartSlice'
import shopSliceReducer from '../redux/features/shop/shopSlice'
import { getFavouritesFromLocalStorage } from "../Utils/localStotage";

const initialFavourites=getFavouritesFromLocalStorage()||[]
 const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        favourites:favouritesReducer,
        cart:cartSliceReducer,
        shop:shopSliceReducer
    },

    preloadedState:{
         favourites:initialFavourites,
    },

    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true,
 })

 setupListeners(store.dispatch)
 export default store


