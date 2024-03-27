import React, { useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

type newUser = {
  newAccount: any;
};

export default function AddNewUser({ newAccount }: newUser) {
  const register = useRef<any>();
  const loaderRegister = useRef<any>();
  const resultRegister = useRef<any>();
  const formData = useRef<any>();
  const addedSuccessInfo = useRef<any>();
  const addedFailedInfo = useRef<any>();

  const [firstName, setFirstName] = useState<any>();
  const [lastName, setLastName] = useState<any>();
  const [mail, setMail] = useState<any>();
  const [login, setLogin] = useState<any>();
  const [pass, setPass] = useState<any>();
  const [type, setType] = useState<any>("Student");

  const loader = (
    <div role="status" className="flex justify-evenly items-center">
      <svg
        aria-hidden="true"
        className="w-5 h-5 text-gray-200 animate-spin dark:text-white-600 fill-blue-600 mr-[10px]"
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
      <div className="">Sprawdzam...</div>
    </div>
  );

  const closePopUp = () => {
    newAccount.current.style.display = "none";
    formData.current.style.display = "flex";
    addedFailedInfo.current.style.display = "none";
    addedSuccessInfo.current.style.display = "none";
    resultRegister.current.style.backgroundColor = "transparent";
    resultRegister.current.innerHTML = "";
    loaderRegister.current.style.display = "none";
    register.current.style.display = "block";
  };

  const tryAgain = () => {
    formData.current.style.display = "flex";
    addedFailedInfo.current.style.display = "none";
    addedSuccessInfo.current.style.display = "none";
    resultRegister.current.style.backgroundColor = "transparent";
    resultRegister.current.innerHTML = "";
    loaderRegister.current.style.display = "none";
    register.current.style.display = "block";
  };

  const addNewUser = async (e: any) => {
    e.preventDefault();

    console.log(`Login: ${login}, hasło: ${pass}, typ:${type}`);

    register.current.style.display = "none";
    loaderRegister.current.style.display = "block";

    const query = JSON.stringify({
      login,
      firstName,
      lastName,
      mail,
      pass,
      type,
    });

    let res = await fetch("api/checkLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: query,
    });

    const result = await res.json();
    console.log(result);

    if (result.UsersData.length > 0) {
      console.log("użytkownik istnieje");
      register.current.style.display = "block";
      loaderRegister.current.style.display = "none";
      resultRegister.current.style.backgroundColor = "red";
      resultRegister.current.innerHTML = "Użytkownik o danym loginie już istnieje";

      setTimeout(() => {
        resultRegister.current.innerHTML = "";
        resultRegister.current.style.backgroundColor = "transparent";
      }, 4000);
    } else {
      let res = await fetch("api/singUpNewUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: query,
      });

      const resultsReg = await res.json();
      console.log(resultsReg);

      if (resultsReg.msg === "added") {
        formData.current.style.display = "none";
        addedSuccessInfo.current.style.display = "flex";
      } else {
        formData.current.style.display = "none";
        addedFailedInfo.current.style.display = "flex";
      }

      resultRegister.current.style.backgroundColor = "green";
      resultRegister.current.innerHTML = "Login dostępny, rejestruję";
      //   loaderRegister.current.style.display = "none";
      console.log("login jest wolny");
    }
  };

  return (
    <div
      ref={newAccount}
      className="hidden fixed w-full h-full bg-gray-500/[0.5] z-10 justify-center items-center"
    >
      <div className="border w-[400px] h-[450px] bg-white rounded-[5px] flex justify-center items-center relative">
        <div
          onClick={closePopUp}
          className="absolute top-0 right-0 bg-red-600 px-[5px] text-white rounded-[5px] cursor-pointer"
        >
          zamknij
        </div>
        <div ref={addedSuccessInfo} className="hidden flex-col items-center justify-evenly w-[60%]">
          <div className="flex w-full items-center justify-evenly">
            <FaCheckCircle className="text-green-500 w-[40px] h-[40px]" />
            <p className="text-[30px]">Dodano :)</p>
          </div>
          <div
            onClick={closePopUp}
            className="bg-green-500 text-white px-[10px] rounded-[5px] mt-[30px] cursor-pointer"
          >
            Zamknij
          </div>
        </div>
        <div ref={addedFailedInfo} className="hidden items-center justify-evenly w-[60%]">
          <IoCloseCircle className="text-red-500 w-[40px] h-[40px]" />
          <p className="text-[30px]">Coś poszło nie tak :(</p>
          <div onClick={tryAgain} className="bg-gree-500 text-white px-[10px]">
            Spróbuj jeszcze raz
          </div>
        </div>
        <form
          ref={formData}
          className="mx-auto flex flex-col justify-evenly items-center h-[400px] w-[80%]"
          onSubmit={addNewUser}
        >
          <p className="font-bold text-[20px]">Stwórz nowe konto</p>
          <div className="h-[40px] w-full text-white text-center leading-[38px] rounded-[5px] overflow-hidden">
            <div ref={resultRegister} className="w-full h-full"></div>
          </div>
          <input
            value={login}
            required
            onChange={(e) => setLogin(e.target.value)}
            className="pl-[8px] border border-gray-400 rounded-[5px] text-[20px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            placeholder="*Nazwa użytkownika (min. 5 znaków)"
          ></input>
          <input
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
            className="pl-[8px] border border-gray-400 rounded-[5px] text-[20px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            placeholder="Imię"
          ></input>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="pl-[8px] border border-gray-400 rounded-[5px] text-[20px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            placeholder="Nazwisko"
          ></input>
          <input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            className="pl-[8px] border border-gray-400 rounded-[5px] text-[20px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            placeholder="Adres email"
          ></input>
          <input
            value={pass}
            required
            onChange={(e) => setPass(e.target.value)}
            className="border border-gray-400 rounded-[5px] text-[20px] pl-[8px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            placeholder="*Hasło"
          ></input>
          <div className="w-full mt-[10px]">
            <p className=" text-[12px] pl-[4px] mb-[3px]">Wybierz poziom uprawnień (wymagane)</p>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="border border-gray-400 rounded-[5px] text-[18px] pl-[8px] w-full placeholder:text-[14px] placeholder:translate-y-[-2px]"
            >
              <option value="Student">Uczeń</option>
              <option value="Nauczyciel">Nauczyciel</option>
              {/* <option value="Admin">Administrator</option> */}
            </select>
          </div>
          <button className="bg-green-500 px-[10px] rounded-[5px] text-white text-[20px] hover:bg-blue-500 duration-200 mt-[30px]">
            <p ref={register}>Sprawdź i zarejestruj</p>
            <p ref={loaderRegister} className="hidden">
              {loader}
            </p>
          </button>
        </form>
      </div>
    </div>
  );
}
