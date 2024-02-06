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
  activeSet: any;
  setActiveSet: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbers: any;
  setSetsOfNumbers: React.Dispatch<React.SetStateAction<any>>;
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<any>>;
  setsFromTeacher: any;
  setSetsFromTeacher: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbersLength: any;
  setSetsOfNumbersLength: React.Dispatch<React.SetStateAction<any>>;
  activeSetNumber: any;
  setActiveSetNumber: React.Dispatch<React.SetStateAction<any>>;
}

export default function NumbersRandom({
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
  activeSet,
  setActiveSet,
  setsOfNumbers,
  setSetsOfNumbers,
  trigger,
  setTrigger,
  setsFromTeacher,
  setSetsFromTeacher,
  setsOfNumbersLength,
  setSetsOfNumbersLength,
  activeSetNumber,
  setActiveSetNumber,
}: QueryParams) {
  const descBasic: any = useRef();
  const setsFromTeacherPopUp: any = useRef();

  const [level, setLevel] = useState("starter");

  const [numberOfNumbers, setNumberOfNumbers] = useState(4);

  //basic level
  const [starterFirstNumber, setStarterFirstNumber] = useState([0, 4]);
  const [starterNextNumbers, setstarterNextNumbers] = useState([-4, 4]);

  const findNextNumber = (NumsArray: any) => {
    setAdvanceSearch(false);
    let i = 0;
    let firstNumber = 0;
    NumsArray.map((i: any) => {
      firstNumber = firstNumber + i;
    });

    let num = Math.round((Math.random() * 2 - 1) * 9);
    console.log(Math.random() * 2 - 1);
    let result = firstNumber + num;
    console.log(result);

    for (;;) {
      if (result < 0 || result > 9) {
        console.log("calculating, number is " + result);
        (num = Math.round((Math.random() * 2 - 1) * 9)), console.log("new num is " + num);
        result = firstNumber + num;
      } else {
        console.log("returning " + num);
        return num;
      }
    }
  };

  const findNumbers = async () => {
    setHowManyNumbers(9);
    setLevelChoosed(2);
    let i = 1;
    let NumsArray: any = [];

    //fist number at the first fire up
    let lastNumber = Math.floor(Math.random() * 9 + 1);
    console.log(lastNumber);

    for ((await i) > 0; i <= 9; i++) {
      if (NumsArray.length === 0) {
        console.log("ok");
        NumsArray = [...NumsArray, lastNumber];
      } else {
        const newNumber = await findNextNumber(NumsArray);
        lastNumber = newNumber;
        NumsArray = [...NumsArray, newNumber];
      }

      console.log(NumsArray);
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
    descBasic.current.style.height = "220px";
    descBasic.current.style.border = "0.3px solid black";
  };

  const handleInfodescStarterHiding = () => {
    descBasic.current.style.height = "0px";
    descBasic.current.style.border = "0px";
  };

  const closePopUpWithSetsFromTeacher = () => {
    setsFromTeacherPopUp.current.style.width = "0px";
    setsFromTeacherPopUp.current.style.height = "0px";
    setsFromTeacherPopUp.current.style.padding = "0px";
  };
  const showPopUpWithSetsFromTeacher = () => {
    setsFromTeacherPopUp.current.style.width = "110%";
    setsFromTeacherPopUp.current.style.height = "350px";
    setsFromTeacherPopUp.current.style.padding = "5px";
  };

  const chosingSetFromTeacher = (table_name: String) => {
    console.log(table_name);
    setActiveSet(table_name);
    setHowManyNumbers(numbers.length + 1);
    setLevelChoosed(4);
    closePopUpWithSetsFromTeacher();
  };

  const DataFromTeacher = (
    <div
      key={i}
      ref={setsFromTeacherPopUp}
      className="absolute w-[0px] bottom-0 z-20 bg-white flex flex-col items-start justify-start shadow-[3px_3px_10px_0px_rgba(0,0,0,0.3)] p-[0px] rounded-[10px] overflow-hidden h-[0px] duration-200"
    >
      <div className="w-full h-[30px] text-left font-semibold text-[20px] mb-[10px]">
        {" "}
        Wybierz zestaw od nauczyciela
      </div>
      <div
        onClick={closePopUpWithSetsFromTeacher}
        className="absolute right-[5px] border w-[20px] h-[20px] text-center leading-[18px] bg-red-500 text-white cursor-pointer"
      >
        X
      </div>
      <div className="flex">
        {setsFromTeacher.map((set: any) => (
          <div
            onClick={(e) => chosingSetFromTeacher(set.table_name)}
            className="border px-[5px] py-[2px] h-[30px] m-[5px] cursor-pointer bg-green-500 text-white rounded-[5px]"
          >
            {set.table_name}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="my-[10px] flex items-center relative">
      {DataFromTeacher}
      <div
        className={
          levelChoosed === 2
            ? "absolute top-0 botom-0 my-auto left-[360px] bg-white duration-200 w-[320px] p-[4px] shadow-xl rounded-[10px] flex items-center"
            : "absolute top-0 botom-0 my-auto left-[50px] bg-white duration-200 w-[320px] p-[4px] flex items-center"
        }
      >
        {/* <Time howMuchTime={howMuchTime} setHowMuchTime={setHowMuchTime} /> */}
        {/* <div className="w-[30px] h-[30px] ml-[10px] text-[#7856B8]">
          <FaInfoCircle
            className="w-full h-full cursor-pointer"
            onMouseOver={handleInfodescStarter}
            onMouseLeave={handleInfodescStarterHiding}
          />
        </div> */}
        <div
          ref={descBasic}
          className={
            levelChoosed === 2
              ? "absolute w-[260px] h-[0px] bg-white overflow-hidden duration-200 shadow-xl z-20"
              : "absolute w-[260px] left-[320px] h-[0px] bg-white overflow-hidden duration-200 shadow-xl z-20"
          }
        >
          <p className="p-[10px]">
            Jeśli jesteś mężczyzną, który lubi uprawiać seks w środku lasu, parku, koniecznie na
            ławce w sąsiedztwie głośnej autostrady dla dodania pikanterii - zgłoś się do lekarza.
            Jeśli jesteś kobietą zgłoś się do twórcy tej aplikacji.
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
      {setsFromTeacher?.length > 0 && (
        <div
          data-name="basic"
          className="duration-200 text-center text-white text-[24px] px-[10px] py-[6px] bg-gradient-to-r from-[#EB5B98] via-[#0D9D8F] to-[#72CF26] w-[320px] mb-[5px] cursor-pointer rounded-[10px] hover:bg-gradient-to-r hover:from-[#7856B8] hover:to-[#7856B8] hover:duration-200 z-10 leading-6"
          onClick={showPopUpWithSetsFromTeacher}
        >
          Zadania od nauczyciela
        </div>
      )}
    </div>
  );
}
