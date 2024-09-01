"use client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession();
  console.log(session)
  if (session?.user){
    redirect("/dashboard")
  } else {
    redirect("/api/auth/signin")
  }
}