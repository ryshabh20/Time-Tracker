import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import userReducer from "./slices/userSlice";

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
  isTimer: boolean;
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
