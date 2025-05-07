import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/config/Api";
import { Product } from "src/types/ProductTypes";

const API_URL = "/products";

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      const data = response.data;
      console.log("data" + data);
      return data;
    } catch (error: any) {
      console.log("error" + error);
      return rejectWithValue(error.message);
    }
  }
);

export const SearchProduct = createAsyncThunk(
  "products/searchProductById",
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          query,
        },
      });
      const data = response.data;
      console.log("search product data", data);
      return data;
    } catch (error: any) {
      console.log("error" + error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products`, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });
      const data = response.data;
      console.log("All product data", data);
      return data;
    } catch (error: any) {
      console.log("error----", error);
      return rejectWithValue(error.message);
    }
  }
);

interface ProductState {
  product: Product | null;
  products: Product[];
  totalPage: number;
  loading: boolean;
  error: string | null | undefined | any;
  searchProduct: Product[];
}

const initialState: ProductState = {
  product: null,
  products: [],
  totalPage: 1,
  loading: false,
  error: null,
  searchProduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.content;
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(SearchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SearchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProduct = action.payload;
    });
    builder.addCase(SearchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
