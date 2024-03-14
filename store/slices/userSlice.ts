import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

export interface UserData {
  _id: string;
  email: string;
  name: string;
  role: string;
  updatedAt: string;
  isTimer: boolean;
  team: string;
  projects: string[];
  timeentries: string[];
  currentTask?: string;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetch", async (thunkApi) => {
  const response = await axios.get("/api/users/currentUser");
  return response.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: { payload: UserData | null }) {
      state.userData = action.payload;
    },
    setLoading(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    setError(state, action: { payload: string }) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
  },
});

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
