import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/config/Api";

export const sellerLogin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", loginRequest);
      console.log("login otp", response.data);
      const jwt = response.data.jwt;
      localStorage.setItem("jwt",jwt);
    } catch (error) {
      console.log("error----", error);
    }
  }
);
