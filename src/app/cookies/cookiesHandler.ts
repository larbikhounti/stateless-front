'use server'
 
import { cookies } from 'next/headers'
 
export  async function save(key : string, value : string) {
  cookies().set({
    name: "access_token",
    value: value,
    httpOnly: true,
    path: '/',
  })
}

export async function get(key : string) {
    const cookieStore = cookies()
    return cookieStore.get(key)
}

