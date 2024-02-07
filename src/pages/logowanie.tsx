import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegCheckCircle } from "react-icons/fa";
import { getCookie } from "cookies-next";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState();
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isPassCorrect, setIsPassCorrect] = useState(false);
  const [logged, setLogged] = useState(false);

  const ExistingCookie = getCookie("_bagagwa");
  console.log(ExistingCookie);

  const checkLoogedUserOnLoad = async () => {
    console.log("dsa");
    const ExistingCookie = await getCookie("_bagagwa");
    console.log(ExistingCookie);
    if (ExistingCookie !== undefined) {
      router.push({ pathname: "/account" });
    }
  };

  const badLoginData: any = useRef();

  const handleLoginData = (e: any) => {
    let value = e.target.value;
    setLogin(value);
  };

  const handlePassData = (e: any) => {
    let value = e.target.value;
    setPass(value);
  };

  console.log(Date());

  const checkDataToMongoDB = async (e: any) => {
    e.preventDefault();
    setIsLoginClicked(true);
    let data = await JSON.stringify({
      login: login,
      pass: pass,
    });

    let Registration = await fetch("/api/loginIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    const ReturnedData = await Registration.json();
    const status = await Registration.status;
    console.log(ReturnedData);

    if (status === 200) {
      setTimeout(() => {
        setIsPassCorrect(true);
        redirectToAdminPage();
      }, 1000);
    } else {
      badLoginData.current.style.height = "50px";
      setTimeout(() => {
        badLoginData.current.style.height = "0px";
      }, 2000);
      setIsPassCorrect(false);
      setIsLoginClicked(false);
    }
  };

  const redirectToAdminPage = () => {
    setTimeout(() => {
      router.push({ pathname: "/account" });
    }, 500);
  };

  return (
    <div
      onLoad={checkLoogedUserOnLoad}
      className="bg-[url('/background.jpeg')] bg-cover bg-center flex items-center justify-center w-screen h-screen"
    >
      <form
        className="shadow-[25px_35px_30px_0px_rgba(0,0,0,0.3)] rounded-[10px] w-[400px] h-[500px] flex flex-col bg-white"
        onSubmit={checkDataToMongoDB}
      >
        <div className="h-[150px] flex items-center justify-center text-[28px] font-semibold relative">
          <p>Logowanie</p>
          <div
            ref={badLoginData}
            className="duration-200 w-[70%] mx-auto absolute h-0 text-[16px] text-white bg-red-400 px-[20px] text-center overflow-hidden"
          >
            Błędny login lub hasło<br></br> spróbuj raz jeszcze
          </div>
        </div>
        <div className="flex flex-col w-[70%] mx-auto">
          <label className="font-semibold">Login:</label>
          <input
            required
            value={login}
            className="border border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
            onChange={handleLoginData}
          ></input>
        </div>
        <div className="flex flex-col w-[70%] mx-auto mt-[20px] ">
          <label className="font-semibold">Hasło:</label>
          <input
            required
            value={pass}
            className=" border border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
            onChange={handlePassData}
          ></input>
        </div>
        {isLoginClicked === false && (
          <button className="bg-green-700 w-[70%] rounded-[7px] mx-auto mt-[20px] text-white text-[24px] py-[5px]">
            Zaloguj
          </button>
        )}
        {/* Loader */}
        {isLoginClicked === true && isPassCorrect === false && (
          <div role="status" className="w-auto mx-auto my-[17px]">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-blue-300 fill-green-600"
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
          </div>
        )}
        {isPassCorrect === true && (
          <div className="w-auto mx-auto my-[17px] text-green-600 flex items-center">
            <FaRegCheckCircle className="w-8 h-8 " />
            <p className="font-bold ml-[10px] text-[20px]">Przekierowuję...</p>
          </div>
        )}

        <div className="w-[70%] mx-auto text-center mt-[35px]">
          <Link href="/" className="text-green-700 font-bold">
            Przejdź do aplikacji
          </Link>
          {/* <p>
            Nie masz konta?&nbsp;
            <Link href="/rejestracja" className="text-green-700 font-bold">
              Zarejestruj się
            </Link>
          </p> */}
        </div>
      </form>
    </div>
  );
}
