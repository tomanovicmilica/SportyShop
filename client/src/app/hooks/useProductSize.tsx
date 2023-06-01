import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchProductSizesAsync, productSizeSelectors } from "../../features/catalog/productSizeSlice";


export default function useProductSize() {
    const productSizes = useAppSelector(productSizeSelectors.selectAll);
    const { productSizesLoaded} = useAppSelector(state => state.productSize);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!productSizesLoaded) dispatch(fetchProductSizesAsync());
    }, [productSizesLoaded, dispatch])

    return {
        productSizes,
        productSizesLoaded
    }
}