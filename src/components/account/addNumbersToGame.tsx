import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";

import Select from "react-select";

type Matrix = {
  rowsGame: any;
  setRowsGame: any;
  colsGame: any;
  setColsGame: any;
  inputDataGame: any;
  setInputDataGame: any;
  clearedInputDataGame: any;
  setClearedInputDataGame: any;
  addNewSetsToExistingTable: any;
  numersList: any;
  gameDataFromDB: any;
};

export default function AddNumbersToGame({
  rowsGame,
  setRowsGame,
  colsGame,
  setColsGame,
  inputDataGame,
  setInputDataGame,
  clearedInputDataGame,
  setClearedInputDataGame,
  addNewSetsToExistingTable,
  numersList,
  gameDataFromDB,
}: Matrix) {
  const infoAboutSetsGame: any = useRef();
  //creating input matrix game

  const router = useRouter();

  const [name, setName] = useState("");
  const [id, setId] = useState(1);
  const middleColumn: any = useRef();

  const itemsRef: any = useRef();

  const handleMovingSetsDown = async (e: any) => {
    const name: any = e.target.getAttribute("name");
    const inputId: any = parseInt(e.target.id);

    const newData = await gameDataFromDB.map((i: any) => {
      if (inputId === i.id && name === i.name) {
        return { ...i, id: i.id + 1 };
      } else if (inputId + 1 === i.id && name !== i.name) {
        return { ...i, id: i.id - 1 };
      } else return i;
    });

    // console.log(newData);

    let query = JSON.stringify(newData);

    let data = await fetch("/api/changeOrderInTheGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    router.refresh();
  };

  const handleMovingSetsUp = async (e: any) => {
    const name: any = e.target.getAttribute("name");
    const inputId: any = parseInt(e.target.id);

    console.log(inputId);
    const newData = await gameDataFromDB.map((i: any) => {
      if (inputId === i.id && name === i.name) {
        return { ...i, id: i.id - 1 };
      } else if (inputId - 1 === i.id && name !== i.name) {
        return { ...i, id: i.id + 1 };
      } else return i;
    });

    console.log(newData);

    let query = JSON.stringify(newData);

    let data = await fetch("/api/changeOrderInTheGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    router.refresh();
  };

  const showedGameData = () => {
    return gameDataFromDB
      ?.sort((a: any, b: any) => a.id - b.id)
      .map((i: any) => {
        return (
          <div key={i} className="border flex flex-col">
            <div className="flex justify-between">
              <div className="flex">
                <span className="font-bold">Nazwa zestawu: &nbsp; </span>
                {i.name} <span className="font-bold">&nbsp;/ # {i.id}</span>
              </div>
              <div>
                <div className="flex">
                  <div>
                    <IoIosArrowUp
                      name={i.name}
                      id={i.id}
                      onClick={handleMovingSetsUp}
                      className="bg-green-500 mr-[2px] mb-[2px] h-[14px] cursor-pointer"
                    />
                  </div>
                  <div>
                    <IoIosArrowDown
                      name={i.name}
                      id={i.id}
                      onClick={handleMovingSetsDown}
                      className="bg-green-500 h-[14px] cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <div
                    id={i.id}
                    onClick={deleteDailySetFromGameData}
                    className="bg-red-500 text-white px-[3px] mr-[3px] rounded-md cursor-pointer text-[12px] leading-[14px] h-[14px] text-center"
                  >
                    usuń
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-[300px]">
              {i.numbers.map((el: any) => (
                <div
                  key={el}
                  className="mr-[4px] mb-[3px] bg-orange-500 text-white px-[4px] rounded-md"
                >
                  {el.set}
                </div>
              ))}{" "}
            </div>
          </div>
        );
      });
  };

  const deleteDailySetFromGameData = async (e: any) => {
    const elementId = await parseInt(e.target.id);
    const newArray = await gameDataFromDB.filter((i: any) => i.id !== elementId);
    // console.log(newArray);
    const newData = await newArray.map((i: any, index: any) => {
      return { ...i, id: index + 1 };
    });

    console.log(newData);

    let query = await JSON.stringify(newData);

    let data = await fetch("/api/deleteSetsFromGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    router.refresh();

    // showedGameData();
  };

  // const showedGameData = gameDataFromDB?.map((i: any) => <div>{i.name}</div>);
  // console.log(showedGameData);

  const addNewSetsToExistingTableGame = async (e: any) => {
    // e.preventDefault();
    console.log("wysyłam");

    let iIndex = 0;

    const numbersData = clearedInputDataGame.map((i: any) => {
      iIndex++;
      return { id: iIndex, set: i };
    });

    console.log(numbersData);

    let query = JSON.stringify({
      id: id,
      name: name,
      numbers: numbersData,
    });

    // console.log(query);

    let data = await fetch("/api/addWeekToBase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const results = await data.json();
    console.log(results.data);
  };

  //
  //changeing numbers of columns and rows
  //

  const handleIncrisingRowsGame = () => {
    const newArray = [...inputDataGame, Array.from({ length: colsGame }, () => null)];
    incriseHeightOfGameDataList();
    setRowsGame(rowsGame + 1);
    setInputDataGame(newArray);
  };

  const handleDecrisingRowsGame = () => {
    const newArray = inputDataGame.splice(0, rowsGame - 1);
    decrisechangeHeightOfGameDataList();
    setRowsGame(rowsGame - 1);
    setInputDataGame(newArray);
    handleFormatSetsGame();
  };

  const handleIncrisingColsGame = () => {
    const newArray = inputDataGame.map((col: any, cellIndex: any) => [...col, null]);
    setColsGame(colsGame + 1);
    setInputDataGame(newArray);
  };

  const handleDecrisingColsGame = () => {
    const newArray = inputDataGame.map((col: any, cellIndex: any) => col.splice(0, colsGame - 1));
    setColsGame(colsGame - 1);
    setInputDataGame(newArray);
  };

  //
  //END OF CHANGING NUMBERS OF ROWS AND COLS
  //

  const handleFormatSetsGame = () => {
    const filteredArray = inputDataGame.map((i: any) =>
      i.filter((num: any) => num !== null && num !== ""),
    );
    const filteredArrayAll = filteredArray.filter((item: any) => item.length !== 0);
    // console.log(filteredArrayAll);
    setClearedInputDataGame(filteredArrayAll);
  };

  const handleAddValue = (e: any, row: number, cols: number) => {
    const value = e.target.value;
    console.log(inputDataGame);
    const newArray = inputDataGame.map((newRow: any, rowIndex: number) =>
      newRow.map((cell: any, cellIndex: any) =>
        rowIndex === row && cellIndex === cols ? value : cell,
      ),
    );

    setInputDataGame(newArray);
  };

  //
  //CHANGING HEIGHT OF DIV WITH GAME DATA
  //

  const incriseHeightOfGameDataList = () => {
    const acutalHeight = getComputedStyle(middleColumn.current);
    const newHeight = parseInt(acutalHeight.height.slice(0, 3)) + 41;
    console.log(newHeight);
    middleColumn.current.style.height = `${newHeight}px`;
  };

  const decrisechangeHeightOfGameDataList = () => {
    const acutalHeight = getComputedStyle(middleColumn.current);
    const newHeight = parseInt(acutalHeight.height.slice(0, 3)) - 41;
    console.log(newHeight);
    middleColumn.current.style.height = `${newHeight}px`;
  };

  //
  //

  let matrixOfInputsGame = inputDataGame.map((el: any, rowIndex: number) => (
    <div key={rowIndex} className="flex items-center">
      <p className="px-[1px] w-[20px] text-[22px]">{rowIndex + 1}</p>
      <div className="w-[150px] h-[30px] flex my-[5px]">
        {el.map((i: any, cellIndex: number) => (
          <input
            key={cellIndex}
            onChange={(e) => handleAddValue(e, rowIndex, cellIndex)}
            className={
              i !== null && i !== ""
                ? "border border-green-500 mx-[3px] w-[30px] text-center text-white rounded-[10px] bg-green-500"
                : "border border-gray-700 mx-[3px] w-[30px] text-center rounded-[10px]"
            }
          ></input>
        ))}
      </div>
    </div>
  ));

  const FormatedSeries = (
    <div className="flex flex-col justify-center items-start">
      {clearedInputDataGame?.map((i: any, index: number) => (
        <div key={i} className="flex text-[20px]">
          <p className="w-[20px]">{index + 1}</p>
          <div className="border-b px-[5px] text-[24px] flex items-center justify-start my-[3px]">
            {i.map((num: number) => (
              <div
                key={num}
                className="bg-green-500 text-white mx-[2px] min-w-[20px] h-[20px] text-center leading-[20px] rounded-[7px] text-[15px]"
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const go = async () => {
      await handleFormatSetsGame();
      console.log("4");
    };
    go();
  }, [inputDataGame]);

  return (
    <div className="w-[1050px] mx-auto min-h-[100px] my-[10px] rounded-[10px] flex">
      <div
        id="adds"
        className="p-[10px] shadow-xl rounded-[10px] mr-[10px] w-[600px] bg-white"
        // onSubmit={sendNumbers}
      >
        {" "}
        <p className="mb-[20px] font-bold text-[20px]">Dodowanie liczb do systemu gier</p>
        <div className="flex pl-[25px] mb-[40px] ">
          <div className="flex items-center flex-col border-r-2 px-[20px]">
            <p className="leading-2">Liczba serii</p>
            <div className="flex items-center">
              <div
                className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                onClick={handleIncrisingRowsGame}
              >
                +
              </div>
              <div className="text-[30px] mx-[10px]">{rowsGame}</div>
              <div
                className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                onClick={handleDecrisingRowsGame}
              >
                -
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col mx-[10px]">
            <p className="leading-2">Liczb w zestawie</p>
            <div className="flex items-center">
              <div
                className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                onClick={handleIncrisingColsGame}
              >
                +
              </div>
              <div className="text-[30px] mx-[10px]">{colsGame}</div>
              <div
                className="text-[30px] cursor-pointer border-gray-900 bg-green-500/[0.2] rounded-[50%] w-[30px] h-[30px] text-center leading-[24px] hover:bg-[#7856B8] hover:text-white duration-200"
                onClick={handleDecrisingColsGame}
              >
                -
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={addNewSetsToExistingTableGame}>
          {matrixOfInputsGame}
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
                    ref={infoAboutSetsGame}
                    className="hidden absolute bg-white z-20 border -top-[130px] left-[220px] w-[300px] h-[120px] shadow-xl p-[10px]"
                  >
                    Przed dodaniem liczb wybierz z listy zestaw do którego je dodasz. Jeśli nie masz
                    zestawu, utwórz go w sekcji niżej.
                  </div>
                  <div className="flex">
                    {/* <Select
                      className="w-[300px]"
                      placeholder="Dodaj do zestawu..."
                      defaultValue={selectedOptionSets}
                      onChange={setSelectedOptionSets}
                      options={options}
                    /> */}
                  </div>
                  <div className="flex text-[20px] items-center">
                    <p>Nazwa</p>
                    <input
                      className="border border-gray-500 w-[200px] mx-[4px] rounded-[5px] text-center"
                      onChange={(e: any) => setName(e.target.value)}
                    ></input>
                    <button
                      // disabled={day === "" || week === "" ? true : false}
                      // onClick={addNewSetsToExistingTable}
                      className={`${
                        name === "" ? "bg-gray-400" : "bg-green-500"
                      } px-[10px] text-white rounded-[7px] ml-[5px] leading-[40px] cursor-pointer`}
                    >
                      Dodaj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* MIDDLE COLUMN */}
      <div
        ref={middleColumn}
        className="gamedata bg-white w-[600px] mr-[10px] rounded-[10px] pl-[10px]  overflow-y-scroll pt-[10px] relative"
      >
        <p className="mb-[20px] font-bold text-[20px] sticky -top-[10px] bg-white">
          Struktura zadań
        </p>
        {showedGameData()}
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex flex-col pt-[10px] shadow-xl rounded-[10px] w-[500px] text-[20px] font-semibold pl-[10px] mb-[0px] bg-white">
        <p>Serie, które zostaną dodane: </p>
        <div>{FormatedSeries}</div>
      </div>
    </div>
  );
}
