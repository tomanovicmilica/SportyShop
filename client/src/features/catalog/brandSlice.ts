import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Brand } from "../../app/models/brand";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface BrandState {
    brandsLoaded: boolean;
    status: string;
}

const brandAdapter = createEntityAdapter<Brand>({
    selectId: (brand) => brand.brandId
});

export const fetchBrandsAsync = createAsyncThunk<Brand[], void, {state: RootState}>(
    'brand/fetchBrandsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Brand.list();
           
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const brandSlice = createSlice({
    name: 'brands',
    initialState: brandAdapter.getInitialState<BrandState>({
        brandsLoaded: false,
        status: 'idle'
    }),
    reducers: {
       
        setBrand: (state, action) => {
            brandAdapter.upsertOne(state, action.payload);
            state.brandsLoaded = false;
        },
        removeBrand: (state, action) => {
            brandAdapter.removeOne(state, action.payload);
            state.brandsLoaded = false;
        }
    },
    extraReducers: 
        (builder => {
            builder.addCase(fetchBrandsAsync.pending, (state, action) => {
                state.status = 'pendingFetchBrands'
            });
            builder.addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                brandAdapter.setAll(state, action.payload);
                state.status = 'idle';
                state.brandsLoaded = true;
            });
            builder.addCase(fetchBrandsAsync.rejected, (state, action) => {
                console.log(action.payload);
                state.status = 'idle';
            });
    })
})

export const brandSelectors = brandAdapter.getSelectors((state: RootState) => state.brand);

export const {setBrand, removeBrand} = brandSlice.actions;