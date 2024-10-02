import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Time from "./time";

interface QueryParams {
  levelChoosed: any;
  setLevelChoosed: React.Dispatch<React.SetStateAction<any>>;
  advanceSearch: any;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
}

export default function NumbersStarter({
  levelChoosed,
  setLevelChoosed,
  advanceSearch,
  setAdvanceSearch,
  numbers,
  setNumbers,
  howManyNumbers,
  setHowManyNumbers,
  howMuchTime,
  setHowMuchTime,
}: QueryParams) {
  const descStarter: any = useRef();

  const [level, setLevel] = useState("starter");

  const [numberOfNumbers, setNumberOfNumbers] = useState(4);

  //basic level
  const [starterFirstNumber, setStarterFirstNumber] = useState([0, 4]);
  const [starterNextNumbers, setstarterNextNumbers] = useState([-4, 4]);

  const findNextNumber = (NumsArray: any) => {
    let i = 0;
    let firstNumber = 0;
    NumsArray.map((i: any) => {
      firstNumber = firstNumber + i;
    });

    let num = Math.round((Math.random() * 2 - 1) * starterFirstNumber[1]);
    // console.log(Math.random() * 2 - 1);
    let result = firstNumber + num;
    // console.log(result);

    for (;;) {
      if (result < 0 || result > starterNextNumbers[1]) {
        console.log("calculating, number is " + result);
        (num = Math.round((Math.random() * 2 - 1) * starterFirstNumber[1])),
          // console.log("new num is " + num);
          (result = firstNumber + num);
      } else {
        // console.log("returning " + num);
        return num;
      }
    }
  };

  const findNumbers = async () => {
    setHowManyNumbers(5);
    setAdvanceSearch(false);
    setLevelChoosed(1);
    let i = 1;
    let NumsArray: any = [];

    //fist number at the first fire up
    let lastNumber = Math.floor(Math.random() * starterFirstNumber[1] + 1);
    // console.log(lastNumber);

    for (i > 0; i <= numberOfNumbers; i++) {
      if (NumsArray.length === 0) {
        // console.log("ok");
        NumsArray = [...NumsArray, lastNumber];
      } else {
        const newNumber = await findNextNumber(NumsArray);
        lastNumber = newNumber;
        NumsArray = [...NumsArray, newNumber];
      }

      // console.log(NumsArray);
    }
    setNumbers(NumsArray);
  };

  const handleChosingLevel = (e: any) => {
    const name = e.target.getAttribute("data-name");
    if (name === "starter") {
      setLevel("starter");
    }
    if (name === "basic") {
      setLevel("basic");
    }
  };

  // console.log(numbers);

  const handleInfodescStarter = () => {
    descStarter.current.style.height = "240px";
    descStarter.current.style.border = "0.3px solid black";
  };

  const handleInfodescStarterHiding = () => {
    descStarter.current.style.height = "0px";
    descStarter.current.style.border = "0px";
  };

  return (
    <div className="my-[10px] flex items-center relative w-[90vw] md:w-auto">
      <div
        className={
          levelChoosed === 1
            ? "absolute top-0 bottom-0 my-auto md:left-[360px] w-[270px] left-0 right-0 mx-auto z-20 lg:z-0 bg-white duration-200 md:w-[320px] p-[5px] md:shadow-xl shadow-[0px_0px_10px_2px_rgba(0,0,0,0.3)] rounded-[10px] flex items-center justify-center"
            : "absolute top-0 bottom-0 my-auto md:left-[50px] left-0 right-0 mx-auto duration-200 md:w-[320px] w-[270px] p-[5px] flex items-center bg-white justify-center"
        }
      >
        <Time howMuchTime={howMuchTime} setHowMuchTime={setHowMuchTime} />
        <div className="w-[30px] h-[30px] ml-[10px] text-[#7856B8] hidden md:block">
          <FaInfoCircle
            className="w-full h-full cursor-pointer"
            onMouseOver={handleInfodescStarter}
            onMouseLeave={handleInfodescStarterHiding}
          />
        </div>
        <div
          ref={descStarter}
          className={
            levelChoosed === 1
              ? "absolute w-[260px] h-[0px] bg-white overflow-hidden duration-200 shadow-xl z-20"
              : "absolute w-[260px] left-[320px] h-[0px] bg-white overflow-hidden duration-200 shadow-xl z-20"
          }
        >
          <p className="p-[10px]">
            Losujesz 4 liczby nie większe niż 4 i nie mniejsza niż (- 4). Wynik zawsze jest dodani,
            wynik pośredni nigdy nie jest mniejszy niż 0, wynik całkowity to liczba z zakresu 0-4.
            Dzięki zadaniom z tego poziomu zrobisz pierwsze kroki w drodze nauki mentalnego
            liczenia.
          </p>
        </div>
      </div>
      <div>
        {/* <div className="flex my-[10px]">
          {numbers.map((i: number) => (
            <div className="border-2 w-[30px] h-[30px] text-center mx-[1px]">
              {i}
            </div>
          ))}
        </div> */}
      </div>
      <div
        data-name="starter"
        className={
          levelChoosed === 1
            ? "duration-200 text-center text-white text-[40px] px-[10px] py-[6px] bg-[#7856B8] md:w-[320px] w-[270px] mb-[5px] cursor-pointer rounded-[10px] hover:bg-[#7856B8] hover:text-white z-10 mx-auto md:mx-0"
            : "duration-200 text-center md:text-[40px] text-[40px] px-[10px] py-[6px] bg-[#49DEE6] md:w-[320px] w-[270px] mb-[5px] cursor-pointer rounded-[10px] hover:bg-[#7856B8] hover:text-white z-10 mx-auto md:mx-0"
        }
        onClick={findNumbers}
      >
        Pierwsze kroki
      </div>
    </div>
  );
}
