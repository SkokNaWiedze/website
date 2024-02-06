import React, { useCallback, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import path from "path";
import { AppContext } from "@/context";

export default function HeaderRandom() {
  const router = useRouter();

  const { LoggedUser, setLoggedUser } = useContext(AppContext);
  console.log(LoggedUser);

  const handleLogin = async () => {
    if (LoggedUser === "") {
      router.push({ pathname: "/logowanie" });
    } else {
      let data = await fetch("/api/logout");
      router.reload();
    }
  };

  return (
    <div className="w-[80%] h-[15vh] mx-auto flex justify-end">
      <div className="flex justify-center items-center">
        {/* <Link href="#" className="mr-[10px]">
          Przejdź do aplikacji
        </Link> */}
        {/* <Link href="#" className="ml-[10px]">
            Strona głowna
          </Link> */}
        {LoggedUser !== "" && (
          <div className="flex items-center justify-center px-[17px] py-[5px] rounded-[10px] cursor-pointer">
            <Link
              href="/account"
              className="mx-[10px] px-[10px] bg-green-500/[0.2] h-[42px] flex items-center justify-center rounded-[10px] font-semibold"
            >
              Panel nauczyciela
            </Link>
            <div className="flex bg-green-500/[0.2] py-[5px] rounded-[10px] px-[10px]">
              <IoPersonSharp className="w-[30px] h-[30px]" />
              <div className="flex flex-col items-left justify-center ml-[10px]">
                <p className="text-[20px] leading-[20px] ">Cześć {LoggedUser} :)</p>
                <p className="text-[12px] leading-[12px]">konto: nauczyciel</p>
              </div>
            </div>
          </div>
        )}
        <div
          onClick={handleLogin}
          className={
            LoggedUser !== ""
              ? "flex items-center justify-center bg-red-500/[0.8] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer"
              : "flex items-center justify-center bg-green-500/[0.8] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer"
          }
        >
          {LoggedUser !== "" && <p>Wyloguj</p>}
          {LoggedUser === "" && <p>Zaloguj</p>}
        </div>
      </div>
    </div>
  );
}
