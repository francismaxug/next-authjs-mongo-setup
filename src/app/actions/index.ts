"use server"

import { signIn, signOut } from "@/auth"

export async function doSocialLogin(formData: FormData) {
  const action = formData.get("action") as string
  await signIn(action, { redirectTo: "/products" })
}

export async function doLogout() {
  await signOut({ redirectTo: "/" })
}

export async function doCredentialLogin(formData: FormData) {
  // console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })
    return response
  } catch (err) {
    throw err
  }
}
