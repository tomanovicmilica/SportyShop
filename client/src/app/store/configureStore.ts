import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { sizeSlice } from "../../features/catalog/sizeSlice";
import { accountSlice } from "../../features/account/accountSlice";
import { brandSlice } from "../../features/catalog/brandSlice";
import { productTypeSlice } from "../../features/catalog/productTypeSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        size: sizeSlice.reducer,
        account: accountSlice.reducer,
        brand: brandSlice.reducer,
        productType: productTypeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;