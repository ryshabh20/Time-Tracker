import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/userSlice";

interface RootState {
  user: UserState;
}

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

interface UserData {
  _id: string;
  email: string;
  name: string;
  projects: string[];
  role: string;
  updatedAt: string;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
