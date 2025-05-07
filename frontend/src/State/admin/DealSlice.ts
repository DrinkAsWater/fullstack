import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/config/Api";
import { DealState } from "src/types/dealTypes";




// Define the initial state 
const initialState: DealState = {
    deals:[],
    loading: false,
    error: null,
    dealCreated: false,
    dealUpdated: false,
}

export const createDeal = createAsyncThunk(
    "deals/createDeal",
    async(deal:any,{rejectWithValue})=>{
        try {
            const response = await api.post("/admin/deals",deal,{
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bear ${localStorage.getItem("jwt")}`
                }
            });
            console.log("create deal",response.data)
        } catch (error:any) {
            console.log("error",error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to create to deal"
            );
        }
    }
);

export const getAllDeals =createAsyncThunk(
    "deals/getAllDeals",
    async(_,{ rejectWithValue })=>{
       try {
        const response = await api.get("/admin/deals",{
           headers:{
               "Content-Type":"application/json",
                    Authorization:`Bear ${localStorage.getItem("jwt")}`
           },
        });
        console.log("get all deal", response.data);
        return response.data;
       } catch (error:any) {
        console.log("error",error.response);
        return rejectWithValue(
            error.response?.data?.message || "Failed to create deal"
        )
       }
    })

    const dealSlice = createSlice({
        name: "deals",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(createDeal.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    state.dealCreated = false;
                })
                .addCase(createDeal.fulfilled, (state) => {
                    state.loading = false;
                    state.dealCreated = true;
                })
                .addCase(createDeal.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                })
                .addCase(getAllDeals.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(getAllDeals.fulfilled, (state, action) => {
                    state.loading = false;
                    state.deals = action.payload;
                })
                .addCase(getAllDeals.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                });
        },
    });
    
    export default dealSlice.reducer;
