import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../app/models/productType";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface ProductTypeState {
    productTypesLoaded: boolean;
    status: string;
}

const productTypeAdapter = createEntityAdapter<ProductType>({
    selectId: (productType) => productType.productTypeId
});

export const fetchProductTypesAsync = createAsyncThunk<ProductType[], void, {state: RootState}>(
    'brand/fetchProductTypesAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.ProductType.list();
           
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const productTypeSlice = createSlice({
    name: 'productTypes',
    initialState: productTypeAdapter.getInitialState<ProductTypeState>({
        productTypesLoaded: false,
        status: 'idle'
    }),
    reducers: {
       
        setProductType: (state, action) => {
            productTypeAdapter.upsertOne(state, action.payload);
            state.productTypesLoaded = false;
        },
        removeProductType: (state, action) => {
            productTypeAdapter.removeOne(state, action.payload);
            state.productTypesLoaded = false;
        }
    },
    extraReducers: 
        (builder => {
            builder.addCase(fetchProductTypesAsync.pending, (state, action) => {
                state.status = 'pendingFetchProductTypes'
            });
            builder.addCase(fetchProductTypesAsync.fulfilled, (state, action) => {
                productTypeAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.productTypesLoaded = true;
            });
            builder.addCase(fetchProductTypesAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.status = 'idle';
            });
    })
})

export const productTypeSelectors = productTypeAdapter.getSelectors((state: RootState) => state.productType);

export const {setProductType, removeProductType} = productTypeSlice.actions;