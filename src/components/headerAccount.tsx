import React, { useCallback, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { AppContext } from "@/context";

export default function HeaderAccount() {
  const router = useRouter();
  const { LoggedUser, setLoggedUser } = useContext(AppContext);

  const handleLogin = async () => {
    let data = await fetch("/api/logout");
    const result = await data.json();
    setLoggedUser("");
    router.replace({ pathname: "/" });
  };

  return (
    <div className="w-[1050px] h-full mx-auto flex justify-between">
      <Image
        src="/logo.jpeg"
        alt="skok na wiedzę"
        width={130}
        height={120}
        className="object-contain"
      />
      <div className="flex justify-center items-center">
        <Link href="/" className="mr-[10px]">
          Przejdź do aplikacji
        </Link>
        {/* <Link href="#" className="ml-[10px]">
            Strona głowna
          </Link> */}
        <div className="flex items-center justify-center bg-green-500/[0.2] px-[17px] py-[5px] rounded-[10px] cursor-pointer">
          <IoPersonSharp className="w-[30px] h-[30px]" />
          <div className="flex flex-col items-left justify-center ml-[10px]">
            <p className="text-[20px] leading-[20px] ">Cześć {LoggedUser} :)</p>
            <p className="text-[12px] leading-[12px]">konto: nauczyciel</p>
          </div>
        </div>
        <div
          onClick={handleLogin}
          className="flex items-center justify-center bg-red-500/[0.8] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer"
        >
          <p>Wyloguj</p>
        </div>
      </div>
    </div>
  );
}
