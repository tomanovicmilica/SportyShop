import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { Size } from "../../app/models/size";


interface SizeState {
    sizesLoaded:boolean;
    status: string;
}

const sizeAdapter = createEntityAdapter<Size>({
    selectId: (size) => size.id
});

export const fetchSizesAsync = createAsyncThunk<Size[], void, {state: RootState}>(
    'size/fetchSizesAsync',
    async(_, thunkAPI) => {
        try {
            return await agent.Size.list();
            
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }

    }
)


export const sizeSlice = createSlice({
    name:'sizes',
    initialState: sizeAdapter.getInitialState<SizeState>({
        sizesLoaded: false,
        status: 'idle'
    }),
    reducers: {
        setSize: (state, action) => {
            sizeAdapter.upsertOne(state, action.payload);
            state.sizesLoaded = false;
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchSizesAsync.pending, (state, action) => {
            state.status = 'pendingFetchSizes'
        });
        builder.addCase(fetchSizesAsync.fulfilled, (state, action) => {
            sizeAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.sizesLoaded = true;
        });
        builder.addCase(fetchSizesAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
           
    }) 
  
})

export const sizeSelectors = sizeAdapter.getSelectors((state: RootState) => state.size);

export const {setSize} = sizeSlice.actions;