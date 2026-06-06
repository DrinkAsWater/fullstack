import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/config/Api";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error) {
      console.log("error----", error);
    }
  }
);

export const fetchAllSellers = createAsyncThunk(
  "sellers/fetchAllSellers",
  async (accountStatus: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/sellers?status=${accountStatus}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);

export const fetchSellerReport = createAsyncThunk(
  "sellers/fetchSellerReport",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/report", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch report"
      );
    }
  }
);

interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllSellers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
