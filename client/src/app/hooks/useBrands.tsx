import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { brandSelectors, fetchBrandsAsync } from "../../features/catalog/brandSlice";

export default function useBrands() {
    const brands = useAppSelector(brandSelectors.selectAll);
    const { brandsLoaded} = useAppSelector(state => state.brand);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!brandsLoaded) dispatch(fetchBrandsAsync());
    }, [brandsLoaded, dispatch])

    return {
        brands,
        brandsLoaded
    }
}