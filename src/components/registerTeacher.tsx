import React, { useState } from "react";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Register() {
  const [isLoginExists, setIsLoginExists] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [addedToDataBase, setAddedToDataBase] = useState(false);

  //register data
  const [login, setLogin] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const checkIfLoginExists = async (value: any) => {
    console.log(value);
    const query = JSON.stringify({
      login: value,
    });

    let results = await fetch("/api/checkLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const returnedData = await results.json();

    if (returnedData.UsersData.length === 1) {
      setIsLoginExists(true);
    } else {
      setIsLoginExists(false);
    }
  };

  const handleLoginData = (e: any) => {
    let value = e.target.value;
    setLogin(value);

    if (value.length > 4) {
      checkIfLoginExists(value);
    }
  };

  const handleFirstNameData = (e: any) => {
    let value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameData = (e: any) => {
    let value = e.target.value;
    setLastName(value);
  };

  const handleEmailData = (e: any) => {
    let value = e.target.value;
    setEmail(value);
  };

  const handlePassData = (e: any) => {
    let value = e.target.value;
    setPass(value);
  };

  const sendDataToMongoDB = async (e: any) => {
    e.preventDefault();
    let data = await JSON.stringify({
      login: login,
      firstName: firstName,
      lastName: lastName,
      mail: email,
      pass: pass,
      type: "Teacher",
    });

    if (isLoginExists === false) {
      setIsSearchClicked(true);

      let Registration = await fetch("/api/singUpTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      const status = Registration.status;

      if (status === 200) {
        setTimeout(() => {
          setAddedToDataBase(true);
        }, 1000);
      }
    }
  };

  return (
    <>
      {addedToDataBase === false && (
        <form
          className="border shadow-xl rounded-[10px] w-[400px] h-[630px] flex flex-col bg-white"
          onSubmit={sendDataToMongoDB}
        >
          <div className="h-[80px] flex items-center justify-center text-[28px] font-bold">
            <p>Rejestracja</p>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-[2px] relative ">
            {isLoginExists === true && login.length > 4 && (
              <div className="absolute text-red-800 right-0 font-bold">
                Login już istnieje w bazie :(
              </div>
            )}
            {isLoginExists === false && login.length > 4 && (
              <div className="absolute text-green-500 right-0 font-bold">Login dostepny :)</div>
            )}
            <label className="font-semibold">Login:</label>
            <input
              required
              value={login}
              onChange={handleLoginData}
              className="border-2 border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
              placeholder="Długość min 5 znaków"
            ></input>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-[10px]">
            <label className="font-semibold">Imię:</label>
            <input
              required
              value={firstName}
              onChange={handleFirstNameData}
              className="border-2 border-gray-400 h-[50px] rounded-[7px] pl-[5px] "
            ></input>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-[10px]">
            <label className="font-semibold">Nazwisko:</label>
            <input
              required
              value={lastName}
              onChange={handleLastNameData}
              className="border-2 border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
            ></input>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-[10px]">
            <label className="font-semibold">Adres e-mail:</label>
            <input
              required
              value={email}
              onChange={handleEmailData}
              className="border-2 border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
            ></input>
          </div>
          <div className="flex flex-col w-[70%] mx-auto mt-[10px] ">
            <label className="font-semibold">Hasło:</label>
            <input
              required
              value={pass}
              onChange={handlePassData}
              className=" border-2 border-gray-400 h-[50px] rounded-[7px] pl-[5px]"
            ></input>
          </div>
          {isSearchClicked === false && (
            <button className="bg-green-700 w-[70%] rounded-[7px] mx-auto mt-[20px] text-white text-[24px] py-[5px]">
              Rejestracja
            </button>
          )}
          {/* Loader */}
          {isSearchClicked === true && (
            <div role="status" className="w-auto mx-auto my-[10px]">
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
          <div className="w-[70%] mx-auto text-center mt-[5px]">
            <p>
              Masz już konto?&nbsp;
              <Link href="/logowanie" className="text-green-700 font-bold">
                Zaloguj się
              </Link>
            </p>
          </div>
        </form>
      )}
      {addedToDataBase === true && (
        <div className="w-[400px] h-[630px] border rounded-[10px] flex flex-col items-center justify-center bg-white">
          <FaRegCheckCircle className="w-[150px] h-[150px] text-green-500" />
          <Link
            href="/logowanie"
            className="bg-blue-400 px-[40px] py-[5px] mt-[20px] text-[24px] text-white rounded-[10px] cursor-pointer"
          >
            Zaloguj się
          </Link>
        </div>
      )}
    </>
  );
}
