import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/config/Api";
import { HomeCategory, HomeData } from "src/types/HomeCategoryTypes";


export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("home categories created ----", response.data);
      return response.data;
    } catch (error: any) {
      //Handle the error and return it be used in rejected action
      const errorMessage =
        error.response?.data?.message || error.message || "Failed";
      console.log("errrr", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  }
);

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //Handle fetchHomePageData lifecycle
        builder.addCase(createHomeCategories.pending,(state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createHomeCategories.fulfilled,(state, action)=>{
          // console.log("API 回傳資料:", action.payload);
            state.loading = false;
            state.homePageData = action.payload;
        });
        builder.addCase(createHomeCategories.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message || 'Failed to create home categories';
        });
    },
});


export default customerSlice.reducer;