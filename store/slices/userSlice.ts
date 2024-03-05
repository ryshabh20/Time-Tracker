import { createSlice } from "@reduxjs/toolkit";

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
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

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
});

export const { setUserData, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
