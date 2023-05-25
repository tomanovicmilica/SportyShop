import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/configureStore";
import { fetchSizesAsync, sizeSelectors } from "../../features/catalog/sizeSlice";

export default function useSize() {
    const sizes = useAppSelector(sizeSelectors.selectAll);
    const { sizesLoaded } = useAppSelector(state => state.size);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (!sizesLoaded) dispatch(fetchSizesAsync());
    }, [sizesLoaded, dispatch])


    return {
        sizes,
        sizesLoaded
    }
}