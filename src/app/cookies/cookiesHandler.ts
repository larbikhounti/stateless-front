'use server'
 
import { cookies } from 'next/headers'
const cookieStore = cookies()

export  async function save(key : string, value : string) {
  cookies().set({
    name: "access_token",
    value: value,
    httpOnly: true,
    path: '/',
  })
}

export async function get(key : string) {

    return cookieStore.get(key)
}

export async function has(key : string) {

    const hasCookie = cookieStore.has(key)
    return hasCookie
  }

