import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { ProductSize } from "../../app/models/productSize";


interface ProductSizeState {
    productSizesLoaded:boolean;
    status: string;
}

const productSizeAdapter = createEntityAdapter<ProductSize>({
    selectId: (productSize) => productSize.id
});

export const fetchProductSizesAsync = createAsyncThunk<ProductSize[], void, {state: RootState}>(
    'size/fetchProductSizesAsync',
    async(_, thunkAPI) => {
        try {
            return await agent.ProductSize.getSizes();
            
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }

    }
)


export const productSizeSlice = createSlice({
    name:'productSizes',
    initialState: productSizeAdapter.getInitialState<ProductSizeState>({
        productSizesLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setProductSize: (state, action) => {
            productSizeAdapter.upsertOne(state, action.payload);
            state.productSizesLoaded = false;
        },
        removeProductSize: (state, action) => {
            productSizeAdapter.removeOne(state, action.payload);
            state.productSizesLoaded = false;
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductSizesAsync.pending, (state, action) => {
            state.status = 'pendingFetchProductSizes'
        });
        builder.addCase(fetchProductSizesAsync.fulfilled, (state, action) => {
            productSizeAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productSizesLoaded = true;
        });
        builder.addCase(fetchProductSizesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
           
    }) 
  
})

export const productSizeSelectors = productSizeAdapter.getSelectors((state: RootState) => state.productSize);

export const {setProductSize, removeProductSize} = productSizeSlice.actions;