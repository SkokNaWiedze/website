import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { connectMongoDB } from "../libs/mongodb";
import type { NextRequest } from "next/server";
import Session from "../models/sessions";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let cookie = await request.cookies.get("_bagagwa");
  // console.log(cookie);
  // => { name: 'nextjs', value: 'fast', Path: '/' }

  let NameFromCookieSpliting = await cookie?.value.split("_");
  let NameFromCookie = await NameFromCookieSpliting?.[0];
  let SessionFromCookie = await NameFromCookieSpliting?.[1];

  let Registration = await fetch("http://localhost:3000/api/getDataMiddleware", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: NameFromCookie,
      session: SessionFromCookie,
    }),
  });

  const ReturnedStatus = await Registration.status;
  console.log(ReturnedStatus);

  if (ReturnedStatus === 200) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/logowanie", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/account",
};