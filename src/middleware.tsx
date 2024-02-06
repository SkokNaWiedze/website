import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { connectMongoDB } from "../libs/mongodb";
import type { NextRequest } from "next/server";
import Session from "../models/sessions";

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("_bagagwa");

  // console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  const NameFromCookieSpliting = cookie?.value.split("_");
  const NameFromCookie = await NameFromCookieSpliting?.[0];
  const SessionFromCookie = await NameFromCookieSpliting?.[1];

  let Registration = await fetch("https://skoknawiedze-beta.vercel.app/api/getDataMiddleware", {
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
  // console.log(ReturnedStatus);

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
