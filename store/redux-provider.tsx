"use client";
import { Provider } from "react-redux";
import { fetchUser, store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
