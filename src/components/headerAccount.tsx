import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";

interface QueryParams {
  LoggedUser: any;
}

export default function HeaderAccount({ LoggedUser }: QueryParams) {
  return (
    <div className="h-[100px] w-screen shadow-xl">
      <div className="w-[80%] h-full mx-auto flex justify-between">
        <Image
          src="/logo.jpeg"
          alt="skok na wiedzę"
          width={130}
          height={120}
          className="object-contain"
        />
        <div className="flex justify-center items-center">
          <Link href="#" className="mr-[10px]">
            Przejdź do aplikacji
          </Link>
          {/* <Link href="#" className="ml-[10px]">
            Strona głowna
          </Link> */}
          <div className="flex items-center justify-center bg-green-500/[0.2] px-[17px] py-[5px] rounded-[10px]">
            <IoPersonSharp className="w-[30px] h-[30px]" />
            <div className="flex flex-col items-left justify-center  ml-[10px]">
              <p className="text-[20px] leading-[20px] ">Cześć {LoggedUser} :)</p>
              <p className="text-[12px] leading-[12px]">konto: nauczyciel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
