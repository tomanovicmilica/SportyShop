import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { ProductSize } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";


interface SizeState {
    size: ProductSize | null;
    sizesLoaded:boolean;
    status: string;
}

const productSizesAdapter = createEntityAdapter<ProductSize>();

export const fetchSizesAsync = createAsyncThunk<ProductSize[], void, {state: RootState}>(
    'size/fetchSizesAsync',
    async(_, thunkAPI) => {
        try {
            var response = await agent.ProductSize.getSizes();
            thunkAPI.dispatch(response);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }

    }
)

export const fetchSizeAsync = createAsyncThunk<ProductSize, number>(
    'size/fetchSizeAsync',
    async (productSizeId, thunkAPI) => {
        try {
            const size = await agent.ProductSize.getSize(productSizeId);
            return size;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const sizeSlice = createSlice({
    name:'sizes',
    initialState: productSizesAdapter.getInitialState<SizeState>({
        size: null,
        sizesLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setSize: (state, action) => {
            state.size = action.payload
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchSizesAsync.pending, (state, action) => {
            state.status = 'pendingFetchSizes'
        });
        builder.addCase(fetchSizesAsync.fulfilled, (state, action) => {
            productSizesAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.sizesLoaded = true;
        });
        builder.addCase(fetchSizesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchSizeAsync.pending, (state) => {
            state.status = 'pendingFetchSize';
        });
        builder.addCase(fetchSizeAsync.fulfilled, (state, action) => {
            productSizesAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchSizeAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
           
    }) 
  
})

export const productSizeSelectors = productSizesAdapter.getSelectors((state: RootState) => state.size);

export const {setSize} = sizeSlice.actions;