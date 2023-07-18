'use client';
import {signIn, useSession} from "next-auth/react";
import SignupForm from "@/app/signup/signup";

export default function SignupPage() {
  const {data, status} = useSession()
  console.log(data, status)
  return <>
    {data?.user?.email}
    <button onClick={() => signIn()}> Sign in</button>

    <SignupForm></SignupForm>
  </>
}
