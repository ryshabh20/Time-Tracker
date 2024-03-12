"use client";
import AddClient from "@/components/AdminClient";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";

const client = () => {
  const user = useAppSelector((state) => state.userData);
  // const fetchingClient = ()
  useEffect(() => {});
  return <div></div>;
};

export default client;
