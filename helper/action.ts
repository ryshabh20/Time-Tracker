"use server";

import { revalidateTag } from "next/cache";

export default async function action() {
  revalidateTag("collection");
}

export async function dynamicaction(tag: string) {
  revalidateTag(tag);
}
