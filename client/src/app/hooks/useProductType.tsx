import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductTypesAsync, productTypeSelectors } from "../../features/catalog/productTypeSlice";

export default function useProductTypes() {
    const productTypes = useAppSelector(productTypeSelectors.selectAll);
    const { productTypesLoaded} = useAppSelector(state => state.productType);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!productTypesLoaded) dispatch(fetchProductTypesAsync());
    }, [productTypesLoaded, dispatch])

    return {
        productTypes,
        productTypesLoaded
    }
}