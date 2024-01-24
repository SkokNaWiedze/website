import RegisterTeacher from "@/components/registerTeacher";
import React, { use, useEffect, useRef, useState } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

export default function account() {
  const [numersList, setNumbersLits] = useState<any | null>([]);
  const [actualNumber, setActualNumber] = useState<any>();
  const [numbersFromDataBase, setNumbersFromDataBase] = useState([]);
  const [activeNumbers, setActiveNumbers] = useState([]);

  const ShowedRegisterWindows: any = useRef();

  const addNumbers = async (e: any) => {
    e.preventDefault();
    setNumbersLits([...numersList, actualNumber]);
    setActualNumber("");
  };

  const deleteNumbers = async (e: any, Numbers: any) => {
    let query = await JSON.stringify({
      Numbers: Numbers,
    });

    e.preventDefault();
    console.log(numersList);
    let data = await fetch("/api/deleteNumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });
    console.log(await data.json());

    getDataFromDataBase();
    checkActualSetsOfNumbers();
  };

  const sendNumbers = async (e: any) => {
    let query = await JSON.stringify({
      Numbers: numersList,
    });

    e.preventDefault();
    console.log(numersList);
    let data = await fetch("/api/pushNumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });
    console.log(await data.json());

    getDataFromDataBase();
    setNumbersLits([]);
  };

  const handleChangingData = (e: any) => {
    console.log(e.target);
    e.preventDefault();
    setActualNumber(e.target.value);
    // let value = e.target.value;
    // setNumbersLits([...numersList, value]);
  };

  const getDataFromDataBase = async () => {
    let data = await fetch("/api/getNumbers", {
      method: "GET",
    });
    // console.log(await data.json());
    const dataJson = await data.json();
    setNumbersFromDataBase(await dataJson.NumbersData);
    // console.log(dataJson.NumbersData);
  };

  const checkActualSetsOfNumbers = async () => {
    let data = await fetch("/api/showActiveNumbersInSets", {
      method: "GET",
    });

    const returnedData = await data.json();
    setActiveNumbers(returnedData.NumbersActiveData);
  };

  console.log(activeNumbers);

  const handlePushingUpSetInSets = () => {};

  const handleNumbersSets = async (e: any, numbers: any, status: any) => {
    // e.preventDefault();
    let query = JSON.stringify({
      Numbers: numbers,
    });

    console.log(numersList);
    let data = await fetch("/api/changeActiveNumberInSets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });
    console.log(await data.json());

    getDataFromDataBase();
    checkActualSetsOfNumbers();
  };

  const addNewTeacherAccount = () => {
    ShowedRegisterWindows.current.style.display = "block";
  };

  const closeTeacherAccount = () => {
    ShowedRegisterWindows.current.style.display = "none";
  };

  useEffect(() => {
    getDataFromDataBase();
    checkActualSetsOfNumbers();
  }, []);

  return (
    <div className="relative">
      <div
        ref={ShowedRegisterWindows}
        className="hidden fixed left-0 top-0 w-full h-full bg-gray-900/[0.5]"
      >
        <div className="flex items-center justify-center w-screen h-screen">
          <div
            onClick={closeTeacherAccount}
            className="absolute right-0 top-0 bg-red-600 text-white px-[10px] text-[26px] rounded-l-[9px] rounded-t-[0px] cursor-pointer"
          >
            Zamknij X
          </div>
          <RegisterTeacher />
        </div>
      </div>
      <div className="flex w-[80%] justify-between mx-auto ">
        <div className="w-[46%] min-h-[100px] my-[10px] rounded-[10px] shadow-xl">
          <form className="p-[10px]" onSubmit={sendNumbers}>
            <p className="mb-[20px] font-bold text-[20px]">Sekcja dodawania liczb do bazy:</p>
            <div className="flex">
              <input
                value={actualNumber}
                onChange={handleChangingData}
                className="border-2 w-[50px]"
              ></input>
              <div
                onClick={addNumbers}
                className="text-center w-[150px] border rounded-[5px] ml-[10px] bg-blue-400 cursor-pointer"
              >
                Dodaj Liczbę
              </div>
            </div>
            <div className="flex flex-col">
              {numersList.length > 0 && <p>Liczby do dodania:</p>}
              <div className="flex">
                <div id="aded-numbers" className="min-w-[200px] flex py-[10px]">
                  {numersList.map((i: any) => (
                    <div className="text-[20px] text-white mx-[10px] border rounded-[10px] bg-green-500 w-[40px] h-[40px] flex items-center justify-center">
                      {i}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                {numersList?.length > 1 && (
                  <>
                    <button className="px-[10px] bg-green-400 rounded-[5px] text-center">
                      Dodaj zestaw
                    </button>
                    <div className="bg-red-400 ml-[4px] w-[120px] rounded-[5px] text-center cursor-pointer">
                      Usuń zestaw
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="w-[46%] min-h-[100px] my-[10px] rounded-[10px] shadow-xl flex flex-col p-[5px]">
          <p className="mb-[20px] font-bold text-[20px]">Konta w systemie:</p>
          <div
            onClick={addNewTeacherAccount}
            className="px-[5px] py-[5px] bg-green-500 w-[200px] cursor-pointer rounded-[5px] mb-[5px]"
          >
            Dodaj konto nauczyciela
          </div>
          <div className="px-[5px] py-[5px] bg-red-500 w-[200px] cursor-pointer rounded-[5px] text-white">
            Usuń konto nauczyciela
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl">
        <div className="p-[10px]">
          <p className="mb-[20px] font-bold text-[20px]">Aktualna kolejka liczb:</p>
          <div id="data=base">
            {activeNumbers?.map((i: any, index) => (
              <div className="flex my-[10px] justify-between border-b py-[5px]">
                <div className="flex">
                  <p className="px-[5px] h-[42px] leading-[42px]">{index + 1}.</p>
                  {i.Numbers.map((number: any) => (
                    <div className="text-[30px] text-white bg-green-400 p-[10px] border min-w-[42px] h-[42px] mr-[5px] flex justify-center items-center rounded-[10px]">
                      {number}
                    </div>
                  ))}
                </div>
                <div id="buttons-wrapper" className="flex">
                  <div className=" text-black px-[10px]">
                    <IoIosArrowDropupCircle className="h-[35px] w-[35px] cursor-pointer" />
                  </div>
                  <div className="text-black">
                    <IoIosArrowDropdownCircle className="h-[35px] w-[35px] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div
            onClick={checkActualSetsOfNumbers}
            className="bg-green-400 ml-[4px] w-[220px] rounded-[5px] text-center cursor-pointer"
          >
            Pobierz aktywne zestawy
          </div> */}
        </div>
      </div>
      <div className="w-[80%] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl">
        <div className="p-[10px]">
          <p className="mb-[20px] font-bold text-[20px]">Zestawy udostepnione dla Ciebie:</p>
          <div id="data=base">
            {activeNumbers?.map((i: any, index) => (
              <div className="flex my-[10px] justify-between border-b py-[5px]">
                <div className="flex">
                  <p className="px-[5px] h-[42px] leading-[42px]">{index + 1}.</p>
                  {i.Numbers.map((number: any) => (
                    <div className="text-[30px] text-white bg-green-400 p-[10px] border min-w-[42px] h-[42px] mr-[5px] flex justify-center items-center rounded-[10px]">
                      {number}
                    </div>
                  ))}
                </div>
                <div id="buttons-wrapper" className="flex">
                  <div className=" text-black px-[10px]">
                    <IoIosArrowDropupCircle className="h-[35px] w-[35px] cursor-pointer" />
                  </div>
                  <div className="text-black">
                    <IoIosArrowDropdownCircle className="h-[35px] w-[35px] cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div
            onClick={checkActualSetsOfNumbers}
            className="bg-green-400 ml-[4px] w-[220px] rounded-[5px] text-center cursor-pointer"
          >
            Pobierz aktywne zestawy
          </div> */}
        </div>
      </div>
      <div
        id="numbers-from-data-base"
        className="w-[80%] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl p-[10px]"
      >
        <p className="mb-[20px] font-bold text-[20px]">Zestawy liczb w bazie:</p>
        <div id="data=base">
          {numbersFromDataBase?.map((i: any, index) => (
            <div className="flex my-[10px] justify-between border-b py-[5px]">
              <div className="flex">
                <p className="px-[5px] h-[42px] leading-[42px]">{index + 1}.</p>
                {i.Numbers.map((number: any) => (
                  <div className="text-[30px] text-white bg-green-400 p-[10px] border min-w-[42px] h-[42px] mr-[5px] flex justify-center items-center rounded-[10px]">
                    {number}
                  </div>
                ))}
              </div>
              <div id="buttons-wrapper" className="flex ">
                <div
                  className="bg-red-500 text-white px-[10px] h-[25px] mr-[20px] cursor-pointer"
                  onClick={(e) => deleteNumbers(e, i.Numbers)}
                >
                  Usuń z bazy
                </div>
                <div
                  className=" text-white  h-[25px]"
                  onClick={(e) => handleNumbersSets(e, i.Numbers, i.isActive)}
                >
                  {i.isActive === false && (
                    <p className="cursor-pointer w-[130px] text-center bg-green-500">
                      Dodaj do kolejki
                    </p>
                  )}
                  {i.isActive === true && (
                    <p className="cursor-pointer w-[130px] text-center bg-yellow-500">
                      Usuń z kolejki
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div
          onClick={getDataFromDataBase}
          className="bg-green-400 ml-[4px] w-[170px] rounded-[5px] text-center cursor-pointer"
        >
          Pobierz zestawy
        </div> */}
      </div>
    </div>
  );
}
