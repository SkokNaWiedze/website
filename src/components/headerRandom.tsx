"use client";
import React, { useCallback, useContext, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import path from "path";
import { AppContext } from "@/context";
import { deleteCookie } from "cookies-next";

export default function HeaderRandom() {
  const router = useRouter();

  const { LoggedUser, setLoggedUser, userType, setUserType } = useContext(AppContext);
  console.log(LoggedUser);

  const login: any = useRef();
  const loginLoader: any = useRef();

  const handleLogin = async () => {
    if (LoggedUser === undefined) {
      login.current.style.display = "none";
      loginLoader.current.style.display = "flex";
      router.push({ pathname: "/logowanie" });
    } else {
      let data = await fetch("/api/logout");
      const results = await data;

      if (results.status === 200) {
        await deleteCookie("_bagagwa", {
          path: "/",
        });
        router.reload();
      }
    }
  };

  return (
    <div className="w-[800px] h-[100px] mx-auto flex justify-end">
      <div className="flex justify-center items-center">
        {/* <Link href="#" className="mr-[10px]">
          Przejdź do aplikacji
        </Link> */}
        {/* <Link href="#" className="ml-[10px]">
            Strona głowna
          </Link> */}
        {LoggedUser !== undefined && (
          <div className="flex items-center justify-center px-[17px] py-[5px] rounded-[10px] cursor-pointer">
            {userType === "Admin" ||
              (userType === "Nauczyciel" && (
                <Link
                  href="/account"
                  className="mx-[10px] px-[10px] bg-green-200 h-[42px] flex items-center justify-center rounded-[10px] font-semibold"
                >
                  Panel nauczyciela
                </Link>
              ))}
            <div className="flex bg-green-200 py-[5px] rounded-[10px] px-[10px]">
              <IoPersonSharp className="w-[30px] h-[30px]" />
              <div className="flex flex-col items-left justify-center ml-[10px]">
                <p className="text-[20px] leading-[20px] ">Cześć {LoggedUser} :)</p>
                <p className="text-[12px] leading-[12px]">konto: {userType}</p>
              </div>
            </div>
          </div>
        )}
        <div
          onClick={handleLogin}
          className={
            LoggedUser !== undefined
              ? "flex items-center justify-center bg-red-500 w-[160px] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer"
              : "flex items-center justify-center bg-green-500 w-[160px] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer"
          }
        >
          {LoggedUser !== undefined && <p>Wyloguj</p>}
          {LoggedUser === undefined && <p ref={login}>Zaloguj</p>}
          <div role="status" ref={loginLoader} className="hidden">
            <svg
              aria-hidden="true"
              className="w-[24px] h-[24px] text-gray-200 animate-spin dark:text-white fill-[#7856B8] mr-[5px]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
            Przekierowuję...
          </div>
        </div>
      </div>
    </div>
  );
}
