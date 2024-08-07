"use server";

import { cookies } from "next/headers";
const cookieStore = cookies();
import { redirect } from "next/navigation";
export async function save(key: string, value: string) {
  cookies().set({
    name: "access_token",
    value: value,
    httpOnly: false,
    path: "/",
  });
}

export async function get(key: string) {
  return cookieStore.get(key);
}

export async function has(key: string) {
  const hasCookie = cookieStore.has(key);
  return hasCookie;
}

export async function destroy(key: string) {

  cookies().delete(key);
  redirect('/')


}
