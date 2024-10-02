import { NextResponse } from "next/server";
import mongoose, { Schema } from "mongoose";
import { connectMongoDB } from "../libs/mongodb";
import type { NextRequest } from "next/server";
import Session from "../models/sessions";

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("_skok_");

  // console.log(cookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  const NameFromCookieSpliting = cookie?.value.split("_");
  const NameFromCookie = await NameFromCookieSpliting?.[0];
  const secondPartSplited = NameFromCookieSpliting?.[1].split("*");
  const SessionFromCookie = await secondPartSplited?.[0];

  let Registration = await fetch("https://skoknawiedze-beta.vercel.app/api/checkIfSessionExists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: NameFromCookie,
      session: SessionFromCookie,
    }),
  });

  // console.log(await Registration.json());

  const returnedData = await Registration;
  const ReturnedStatus = returnedData.status;
  let ReturnedJson;

  if (ReturnedStatus === 200) {
    ReturnedJson = await Registration.json();
  } else {
    ReturnedJson = "";
  }
  console.log("LLLFLLFLFLFLFLFLFLFLFLFLFLFLLFLFLFFLLFs " + ReturnedJson.result, ReturnedStatus);

  // check if user is Admin or Teacher

  if (
    (ReturnedStatus === 200 && ReturnedJson.result === "Admin") ||
    ReturnedJson.result === "Teacher"
  ) {
    if (request.url.includes("/account")) {
      console.log("1");
      return NextResponse.next();
    } else if (request.url.includes("/logowanie")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // check if user is Student
  else if (ReturnedStatus === 200 && ReturnedJson.result === "Student") {
    if (request.url.includes("/account")) {
      console.log("1");
      return NextResponse.redirect(new URL("/student", request.url));
      // return NextResponse.next();
    } else if (request.url.includes("/logowanie")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (request.url.includes("/student")) {
      console.log("1");
      return NextResponse.next();
    }
  }

  // check if user is not logged
  else if (
    (ReturnedStatus === 405 && ReturnedJson.result === "") ||
    ReturnedJson.result === undefined
  ) {
    if (request.url.includes("/account")) {
      return NextResponse.redirect(new URL("/logowanie", request.url));
    } else if (request.url.includes("/logowanie")) {
      return NextResponse.next();
    } else if (request.url.includes("/student")) {
      console.log("1");
      return NextResponse.redirect(new URL("/logowanie", request.url));
    }
  }

  // else if (request.url.includes("/account")) {
  //   console.log("1");
  //   return NextResponse.redirect(new URL("/logowanie", request.url));
  // } else if (request.url.includes("/logowanie")) {
  //   return NextResponse.next();
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account", "/logowanie", "/student"],
};
