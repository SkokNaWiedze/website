import React, { useCallback, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoPersonSharp } from "react-icons/io5";
import { AppContext } from "@/context";
import { deleteCookie } from "cookies-next";

type newUser = {
  newAccount: any;
};

export default function HeaderAccount({ newAccount }: newUser) {
  const router = useRouter();
  const { LoggedUser, setLoggedUser, userType, setUserType } = useContext(AppContext);

  const handleLogin = async () => {
    if (LoggedUser === "") {
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

  const showNewUserPopUp = () => {
    newAccount.current.style.display = "flex";
  };

  const closeNewUserPopUp = () => {
    newAccount.current.style.display = "none";
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
        <Link
          href="/"
          className="mr-[10px] bg-green-500/[0.2] h-[42px] flex justify-center items-center px-[10px] rounded-[10px] font-semibold hover:bg-[#7856B8] hover:text-white duration-200"
        >
          Przejdź do aplikacji
        </Link>
        {userType === "Admin" && (
          <div
            onClick={showNewUserPopUp}
            className="cursor-pointer mr-[10px] bg-green-500/[0.6] h-[42px] flex justify-center items-center px-[10px] rounded-[10px] font-semibold hover:bg-[#7856B8] hover:text-white duration-200"
          >
            Utwórz konto
          </div>
        )}
        {LoggedUser !== "" && (
          <>
            <div className="flex items-center justify-center bg-green-500/[0.2] px-[17px] py-[5px] rounded-[10px]">
              <IoPersonSharp className="w-[30px] h-[30px]" />
              <div className="flex flex-col items-left justify-center ml-[10px]">
                <p className="text-[20px] leading-[20px] ">Cześć {LoggedUser} :)</p>
                <p className="text-[12px] leading-[12px]">konto: nauczyciel</p>
              </div>
            </div>
            <div
              onClick={handleLogin}
              className="flex items-center justify-center bg-red-500/[0.8] px-[17px] py-[9px] rounded-[10px] ml-[5px] text-white cursor-pointer hover:bg-[#7856B8] hover:text-white duration-200"
            >
              <p>Wyloguj</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
