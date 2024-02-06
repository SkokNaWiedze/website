import React, { use, useContext, useEffect, useState, useRef } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import HeaderAccount from "@/components/headerAccount";
import { AppContext } from "@/context";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

import Select from "react-select";
import AddNewSet from "@/components/addNewSet";

export default function Account() {
  const newSets: any = useRef();
  const infoAboutSets: any = useRef();
  const loader: any = useRef();

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  const [inputData, setInputData] = useState<any>(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => null)),
  );

  const [clearedInputData, setClearedInputData] = useState<any>();

  const [newTable, setNewTable] = useState();

  const [numersList, setNumbersLits] = useState<any | null>([]);
  const [actualNumber, setActualNumber] = useState<any>();
  const [numbersFromDataBase, setNumbersFromDataBase] = useState([]);
  const [userSetsData, setUserSetsData] = useState<any>();
  const [namesOfActiveSets, setNamesOfActiveSets] = useState<any | null>([]);
  const [namesOfAllSets, setNamesOfAllSets] = useState<any | null>([]);
  const [yourTables, setYourTables] = useState();
  const [ownersSets, setOwnerSets] = useState();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const { LoggedUser, setLoggedUser } = useContext(AppContext);
  // console.log(LoggedUser);

  // const getUserName = async () => {
  //   let data = await fetch("/api/getCookie", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   let results = await data.json();
  //   let name = await results.name.split("_");
  //   setLoggedUser(name[0]);
  // };

  const checkActualSetsOfNumbers = (returned: any) => {
    // console.log(returned);
    setUserSetsData(returned?.NumbersActiveData);
    // console.log(returned);
    setOwnerSets(setsForUserFromDataBase);
    setTimeout(() => {
      setIsDataLoaded(true);
    }, 500);
  };

  const getActiveSets = (returned: any) => {
    let result: any = [];
    let AllSets: any = [];
    returned.NumbersActiveData.map((i: any) => {
      // console.log(i);
      AllSets = [...AllSets, i.table_name];
      if (i.isActive === true) {
        result = [...result, i.table_name];
      }
    });
    setNamesOfActiveSets(result);
    setNamesOfAllSets(AllSets);
    // console.log("third");
  };

  const getSetsAndNamesFromDB = async () => {
    const Login = await LoggedUser;

    let query = JSON.stringify({
      name: Login,
    });

    let data = await fetch("/api/showActiveNumbersInSets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const returned = await data.json();
    // console.log("second");
    await getActiveSets(returned);
    setSetsForUserFromDataBase(returned);
    await checkActualSetsOfNumbers(returned);
  };

  //data downloaded from MongoDB
  const [setsForUserFromDataBase, setSetsForUserFromDataBase] = useState<any | null>(null);
  const [selectedOptionSets, setSelectedOptionSets] = useState<any | null>(null);
  const [selectedOptionUser, setSelectedOptionUser] = useState(null);
  const [data, setData] = useState(() => {});

  const options = namesOfAllSets.map((i: any) => {
    return {
      value: i,
      label: i,
    };
  });

  const users = [
    { value: "magda", label: "Magda" },
    { value: "karolina", label: "Karolina" },
    { value: "marek", label: "Marek" },
    { value: "basia", label: "Basia" },
    { value: "krysia", label: "Krysia" },
    { value: "robert", label: "Robert" },
  ];

  const deleteNumbers = async (e: any, Numbers: any) => {
    setIsDataLoaded(false);
    let query = await JSON.stringify({
      Numbers: Numbers,
    });

    e.preventDefault();
    // console.log(numersList);
    let data = await fetch("/api/deleteNumbers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });
    // console.log(await data.json());

    getDataFromDataBase();
    // checkActualSetsOfNumbers();
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

  const getDataFromDataBase = async () => {
    let data = await fetch("/api/getNumbers", {
      method: "GET",
    });
    const dataJson = await data.json();
    setNumbersFromDataBase(await dataJson.NumbersData);
  };

  const handleAddValue = (e: any, row: number, cols: number) => {
    const value = e.target.value;
    const newArray = inputData.map((newRow: any, rowIndex: number) =>
      newRow.map((cell: any, cellIndex: any) =>
        rowIndex === row && cellIndex === cols ? value : cell,
      ),
    );

    setInputData(newArray);
  };

  const handleNumbersSets = async (e: any, table_name: any) => {
    // e.preventDefault();
    console.log(table_name);
    let query = JSON.stringify({
      name: table_name,
      login: LoggedUser,
    });

    let data = await fetch("/api/changeActivityStatusForSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    console.log(await data.json());

    getDataFromDataBase();
    getSetsAndNamesFromDB();
  };

  const addNewSetOfNumbers = async () => {
    newSets.current.style.display = "flex";
    // let query = JSON.stringify({
    //   owner: "Marek",
    //   table_name: "Na wtorek",
    //   numbers: [[19, 20, 30]],
    //   isActive: true,
    //   shared: ["Marek"],
    // });

    // let data = await fetch("/api/addNewTable", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: query,
    // });
  };

  const ActiveSets = (
    <div className="flex text-white justify-start items-center">
      {namesOfActiveSets.map((s: any) => (
        <div
          key={s}
          className="px-[5px] bg-green-500 m-[5px] rounded-[5px] flex justify-center items-center"
        >
          {s}
          <IoIosCloseCircleOutline
            onClick={(e: any) => handleNumbersSets(e, s)}
            className="ml-[5px] cursor-pointer duration-200 hover:text-red-600"
          />
        </div>
      ))}
    </div>
  );

  const SharedSetsNames = userSetsData?.map((i: any) => (
    <div key={i} className="flex my-[10px] justify-between py-[5px]">
      <div className="flex items-start">
        {i.numbers.map((sets: any, index: any) => (
          <div key={sets} className="flex">
            <div className="text-[30px] text-white p-[10px] border min-w-[42px] min-h-[42px] mr-[5px] flex justify-start items-center rounded-[10px]">
              {" "}
              <div className="flex border-red-900 justify-start">
                <div className="bg-green-400 h-[30px] px-[10px] rounded-[10px] text-[20px]">
                  {sets.table_name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ));

  const handleDeletingSetFromDB = async (e: any, table_name: any) => {
    // loader.current.style.display = "flex";
    let query = JSON.stringify({
      owner: LoggedUser,
      table_name: table_name,
    });

    let data = await fetch("/api/deleteTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const result = await data.json();
    console.log(result);

    // console.log(await data.json());
    setNewTable(table_name);
    getSetsAndNamesFromDB();
    setSelectedOptionSets(null);
  };

  const YourSets = userSetsData?.map((i: any) => (
    <div key={i} className="flex my-[10px] justify-between py-[5px]">
      <div className="flex items-start border-b pb-[10px]">
        <div className="bg-green-400 h-[30px] w-[150px] px-[10px] rounded-[10px] text-[20px] text-white">
          {i.table_name}
        </div>
        <div className="flex flex-wrap text-white w-[580px]">
          {i.numbers.length > 0 ? (
            i.numbers.map((n: any) => (
              <div key={n} className="m-[3px] h-[30px] text-[14px] flex bg-[#0A347A]  p-[4px]">
                {n.map((one: any) => (
                  <div
                    key={one}
                    className="h-[20px] p-[10px] rounded-[4px] border leading-[2px] mx-[1px]"
                  >
                    {one}
                  </div>
                ))}
                <div
                  onClick={() => handleDeleteNumberFromSet(n, i.table_name)}
                  className="pl-[5px] flex items-center justify-center"
                >
                  <IoIosCloseCircleOutline className="text-white bg-#0A347A w-[20px] h-[20px] cursor-pointer duration-200 hover:text-red-500" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-black flex items-center">
              <Image src="/empty.jpg" width={50} height={50} alt="empty"></Image>
              <p className="font-semibold ml-[20px]">Brak liczb w tym zestawie... :(</p>
            </div>
          )}
        </div>
        <form onSubmit={(e) => handleDeletingSetFromDB(e, i.table_name)}>
          <button
            type="submit"
            className=" text-white  h-[25px] mr-[3px]"
            // onClick={(e) => handleDeletingSetFromDB(e, i.table_name)}
          >
            <p className="cursor-pointer w-[130px] text-center bg-red-500">Usuń trwale</p>
          </button>
        </form>
        {i.numbers.length > 0 && (
          <div id="buttons-wrapper" className="flex ">
            <div
              className=" text-white  h-[25px]"
              onClick={(e) => handleNumbersSets(e, i.table_name)}
            >
              {i.isActive === false && (
                <p className="cursor-pointer w-[130px] text-center bg-green-500">Aktywuj</p>
              )}
              {i.isActive === true && (
                <p className="cursor-pointer w-[130px] text-center bg-yellow-500">Deaktywuj</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ));

  const getSharedTables = async () => {
    let query = JSON.stringify({
      login: LoggedUser,
    });

    let data = await fetch("/api/getSharedTables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const dataJson = await data.json();
    const SharedData = await dataJson.results;
    console.log(SharedData);

    const SharedResults = SharedData.map((numbers: any) => {
      // <div className="flex">
      //   {numbers.map((num: any) => (
      //     <div className="">{num}</div>
      //   ))}
      // </div>
    });

    setYourTables(SharedResults);
    // setIsDataLoaded(true);
  };

  //creating input matrix
  const handleIncrisingRows = () => {
    const newArray = [...inputData, Array.from({ length: cols }, () => null)];
    setRows(rows + 1);
    setInputData(newArray);
  };

  const handleDecrisingRows = () => {
    const newArray = inputData.splice(0, rows - 1);
    setRows(rows - 1);
    setInputData(newArray);
    handleFormatSets();
  };

  const handleIncrisingCols = () => {
    const newArray = inputData.map((col: any, cellIndex: any) => [...col, null]);
    setCols(cols + 1);
    setInputData(newArray);
  };

  const handleDecrisingCols = () => {
    const newArray = inputData.map((col: any, cellIndex: any) => col.splice(0, cols - 1));
    setCols(cols - 1);
    setInputData(newArray);
  };
  //END of Matrix

  const handleFormatSets = () => {
    const filteredArray = inputData.map((i: any) =>
      i.filter((num: any) => num !== null && num !== ""),
    );
    const filteredArrayAll = filteredArray.filter((item: any) => item.length !== 0);
    // console.log(filteredArrayAll);
    setClearedInputData(filteredArrayAll);
  };

  const FormatedSeries = (
    <div className="flex flex-col justify-center items-start">
      {clearedInputData?.map((i: any, index: number) => (
        <div key={i} className="flex text-[20px]">
          <p className="w-[20px]">{index + 1}</p>
          <div className="border-b px-[5px] text-[24px] flex items-center justify-start my-[3px]">
            {i.map((num: number) => (
              <div
                key={num}
                className="bg-green-500 text-white mx-[2px] min-w-[30px] h-[30px] text-center leading-[30px] rounded-[7px] text-[24px]"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  let matrixOfInputs = inputData.map((el: any, rowIndex: number) => (
    <div key={rowIndex} className="flex items-center">
      <p className="px-[5px] w-[30px] text-[22px]">{rowIndex + 1}</p>
      <div className="w-[150px] h-[40px] flex my-[5px]">
        {el.map((i: any, cellIndex: number) => (
          <input
            key={cellIndex}
            onChange={(e) => handleAddValue(e, rowIndex, cellIndex)}
            className={
              i !== null && i !== ""
                ? "border border-green-500 mx-[3px] w-[40px] text-center text-white rounded-[10px] bg-green-500"
                : "border border-gray-700 mx-[3px] w-[40px] text-center rounded-[10px]"
            }
          ></input>
        ))}
      </div>
    </div>
  ));

  const handleDeleteNumberFromSet = async (set: any, table_name: any) => {
    // console.log(set, table_name);

    let query = JSON.stringify({
      owner: LoggedUser,
      table_name: table_name,
      set: set,
    });

    let data = await fetch("/api/deleteOneNumberFromSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const result = await data.json();
    if (result.length === 0) {
      console.log(result);
    }
    getSetsAndNamesFromDB();
  };

  const addNewSetsToExistingTable = async (e: any) => {
    // e.preventDefault();
    console.log("wysyłam");

    let query = JSON.stringify({
      owner: LoggedUser,
      table: selectedOptionSets.label,
      numbers: clearedInputData,
      shared: [],
      isActive: false,
    });
    console.log(query);

    let data = await fetch("/api/addSetToTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const results = await data.json();
    // console.log("first");
  };

  const closingPopUpForNewTable = () => {
    newSets.current.style.display = "none";
  };

  const showInfoAboutSets = () => {
    infoAboutSets.current.style.display = "block";
  };

  const hideInfoAboutSets = () => {
    infoAboutSets.current.style.display = "none";
  };

  console.log(inputData);

  useEffect(() => {
    const go = async () => {
      console.log("use Effect");
      await getDataFromDataBase();
      console.log("1");
      await getSetsAndNamesFromDB();
      console.log("2");
      // await getSharedTables();
      console.log("3");
      await handleFormatSets();
      console.log("4");
    };
    go();
  }, [inputData, newTable, LoggedUser]);

  return (
    <div>
      {isDataLoaded === false && (
        <div
          ref={loader}
          className="fixed w-screen h-screen bg-white/[0.7] z-50 flex items-center justify-center"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-[100px] h-[100px] text-gray-200 animate-spin dark:text-red-100 fill-green-600 rounded-[50%]"
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
        </div>
      )}
      <div
        ref={newSets}
        className="fixed hidden w-screen h-screen bg-gray-700/[0.7] z-30 items-center justify-center"
      >
        <div
          onClick={closingPopUpForNewTable}
          className="text-white absolute top-[5px] right-[20px] bg-red-600 px-[10px] text-[24px] rounded-[10px] cursor-pointer"
        >
          Zamknij
        </div>
        <AddNewSet
          sets={newSets}
          dataFromDB={getDataFromDataBase}
          owner={LoggedUser}
          newTable={setNewTable}
          setIsDataLoaded={setIsDataLoaded}
        />
      </div>
      <div className="fixed w-screen bg-white shadow-md z-20">
        <HeaderAccount />
      </div>
      <p className="mb-[20px] pt-[100px] font-bold text-[20px] m-auto w-[1050px]">
        Sekcja dodawania liczb do bazy:
      </p>
      <div className="w-[1050px] mx-auto min-h-[100px] my-[10px] rounded-[10px] flex">
        <div
          className="p-[10px] shadow-xl rounded-[10px] mx-[10px] w-[600px]"
          // onSubmit={sendNumbers}
        >
          <div className="flex pl-[25px] mb-[40px]">
            <div className="flex items-center flex-col border-r-2 px-[20px]">
              <p className="leading-2">Ile serii?</p>
              <div className="flex items-center">
                <div
                  className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                  onClick={handleIncrisingRows}
                >
                  +
                </div>
                <div className="text-[30px] mx-[10px]">{rows}</div>
                <div
                  className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                  onClick={handleDecrisingRows}
                >
                  -
                </div>{" "}
              </div>
            </div>
            <div className="flex items-center flex-col mx-[10px]">
              <p className="leading-2">Ile max liczb w zestawie?</p>
              <div className="flex items-center">
                <div
                  className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                  onClick={handleIncrisingCols}
                >
                  +
                </div>
                <div className="text-[30px] mx-[10px]">{cols}</div>
                <div
                  className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                  onClick={handleDecrisingCols}
                >
                  -
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={addNewSetsToExistingTable}>
            {matrixOfInputs}
            <div className="flex flex-col">
              {/* {numersList.length > 0 && <p>Liczby do dodania:</p>} */}
              <div className="flex">
                <div id="aded-numbers" className="min-w-[200px] flex py-[10px]">
                  {numersList.map((i: any) => (
                    <div
                      key={i}
                      className="text-[20px] text-white mx-[10px] border rounded-[10px] bg-green-500 w-[40px] h-[40px] flex items-center justify-center"
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col">
                  <div className="border-b-2"></div>
                  {/* <button className="px-[10px] bg-green-400 rounded-[5px] text-center w-[200px] my-[8px]">
                    Dodaj zestaw do bazy
                  </button> */}
                  {/* <div
                  onClick={handleFormatSets}
                  className="px-[10px] bg-green-400 rounded-[5px] text-center w-[200px] my-[8px] cursor-pointer"
                >
                  Sprawdź
                </div> */}
                  {/* <p>lub</p> */}
                  <div className="flex my-[8px] relative">
                    <div
                      ref={infoAboutSets}
                      className="hidden absolute bg-white z-20 border -top-[130px] left-[220px] w-[300px] h-[120px] shadow-xl p-[10px]"
                    >
                      Przed dodaniem liczb wybierz z listy zestaw do którego je dodasz. Jeśli nie
                      masz zestawu, utwórz go w sekcji niżej.
                    </div>
                    <div className="flex">
                      <Select
                        className="w-[300px]"
                        placeholder="Dodaj do zestawu..."
                        defaultValue={selectedOptionSets}
                        onChange={setSelectedOptionSets}
                        options={options}
                      />
                    </div>
                    {/* <div>
                      <Select
                        isMulti
                        className="w-[300px] ml-[10px]"
                        placeholder="Udostępnij dla..."
                        defaultValue={selectedOptionUser}
                        onChange={setSelectedOptionSets}
                        options={users}
                      />
                    </div> */}
                    {selectedOptionSets === null || selectedOptionSets === "" ? (
                      <>
                        <div
                          onMouseEnter={showInfoAboutSets}
                          onMouseLeave={hideInfoAboutSets}
                          // onClick={addNewSetsToExistingTable}
                          className=" px-[10px] rounded-[7px] text-black bg-gray-200 ml-[5px] leading-[40px] cursor-pointer"
                        >
                          Dodaj
                        </div>
                      </>
                    ) : (
                      <button
                        // onClick={addNewSetsToExistingTable}
                        className="px-[10px] text-white rounded-[7px] bg-green-500 ml-[5px] leading-[40px] cursor-pointer"
                      >
                        Dodaj
                      </button>
                    )}
                  </div>
                  {/* <div className="bg-red-400 ml-[4px] w-[120px] rounded-[5px] text-center cursor-pointer">
                    Wyczyść
                  </div> */}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col pt-[10px] shadow-xl rounded-[10px] w-[500px] text-[20px] font-semibold pl-[10px] mb-[0px]">
          <p>Serie, które zostaną dodane: </p>
          <div>{FormatedSeries}</div>
        </div>
      </div>
      <div className="w-[1050px] mx-auto min-h-[100px] my-[10px] rounded-[10px] shadow-xl">
        <div className="p-[10px]">
          <div className="flex w-full justify-between">
            <div>
              <p className="mb-[20px] font-bold text-[20px]">Aktywne zestawy liczb</p>
              {ActiveSets}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1050px] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl">
        <div className="p-[10px]">
          <div className="flex w-full justify-between">
            <div>
              <p className="mb-[20px] font-bold text-[20px]">Twoje zestawy liczb:</p>
            </div>
            <div className="h-[30px] w-[400px] flex justify-end">
              {/* <input className="border mr-[5px] rounded-[5px]"></input> */}
              <div
                onClick={addNewSetOfNumbers}
                className="h-[30px] bg-green-500 leading-7 px-[10px] rounded-[5px] text-white cursor-pointer"
              >
                <p>Stwórz nowy zestaw</p>
              </div>
            </div>
          </div>
          {yourTables}
          <div id="data=base">{YourSets}</div>
          {/* <div
            onClick={checkActualSetsOfNumbers}
            className="bg-green-400 ml-[4px] w-[220px] rounded-[5px] text-center cursor-pointer"
          >
            Pobierz aktywne zestawy
          </div> */}
        </div>
      </div>
      <div className="w-[1050px] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl">
        <div className="p-[10px]">
          <p className="mb-[20px] font-bold text-[20px]">
            Zestawy udostepnione dla Ciebie: (wkrótce)
          </p>
          <div id="data=base">
            {/* {activeNumbers?.map((i: any, index) => (
              <div key={i} className="flex my-[10px] justify-between border-b py-[5px]">
                <div className="flex">
                  <p className="px-[5px] h-[42px] leading-[42px]">{index + 1}.</p>
                  {i.Numbers.map((number: any) => (
                    <div
                      key={i}
                      className="text-[30px] text-white bg-green-400 p-[10px] border min-w-[42px] h-[42px] mr-[5px] flex justify-center items-center rounded-[10px]"
                    >
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
            ))} */}
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
        className="w-[1050px] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl p-[10px]"
      >
        <p className="mb-[20px] font-bold text-[20px]">Zestawy liczb w bazie:</p>
        <div id="data=base">
          {numbersFromDataBase?.map((i: any, index) => (
            <div key={i} className="flex my-[10px] justify-between border-b py-[5px]">
              <div className="flex">
                <p className="px-[5px] h-[42px] leading-[42px]">{index + 1}.</p>
                {i.Numbers.map((number: any) => (
                  <div
                    key={i}
                    className="text-[30px] text-white bg-green-400 p-[10px] border min-w-[42px] h-[42px] mr-[5px] flex justify-center items-center rounded-[10px]"
                  >
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
                  onClick={(e) => handleNumbersSets(e, i.Numbers)}
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
      </div>
    </div>
  );
}
