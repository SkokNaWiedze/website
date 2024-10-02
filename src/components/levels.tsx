import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import NumbersStarter from "@/components/lvlstarter";
import NumbersAdvance from "./lvladvance";
import NumbersBasic from "./lvlbasic";
import NumbersRandom from "./lvlrandom";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import Complexity from "./complexity";

interface Props {
  startCounting: any;
  advanceSearch: any;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<any>>;
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  actualNumber: any;
  setActualNumber: React.Dispatch<React.SetStateAction<any>>;
  sum: any;
  setSum: React.Dispatch<React.SetStateAction<any>>;
  finish: any;
  setFinish: React.Dispatch<React.SetStateAction<any>>;
  levelChoosed: any;
  setLevelChoosed: React.Dispatch<React.SetStateAction<any>>;
  activeSet: any;
  setActiveSet: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbers: any;
  setSetsOfNumbers: React.Dispatch<React.SetStateAction<any>>;
  setsFromTeacher: any;
  setSetsFromTeacher: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbersLength: any;
  setSetsOfNumbersLength: React.Dispatch<React.SetStateAction<any>>;
  activeSetNumber: any;
  setActiveSetNumber: React.Dispatch<React.SetStateAction<any>>;
}

export default function Levels({
  advanceSearch,
  setAdvanceSearch,
  trigger,
  setTrigger,
  howMuchTime,
  setHowMuchTime,
  numbers,
  setNumbers,
  howManyNumbers,
  setHowManyNumbers,
  actualNumber,
  setActualNumber,
  sum,
  setSum,
  finish,
  setFinish,
  levelChoosed,
  setLevelChoosed,
  activeSet,
  setActiveSet,
  setsOfNumbers,
  setSetsOfNumbers,
  setsFromTeacher,
  setSetsFromTeacher,
  setsOfNumbersLength,
  setSetsOfNumbersLength,
  activeSetNumber,
  setActiveSetNumber,
  startCounting,
}: Props) {
  const handleAdvanceSearch = () => {
    setAdvanceSearch(true);
  };

  const handleTrigger = () => {
    setTrigger(!trigger);
    setActualNumber("");

    // let i = 0;
    // let suma: number = 0;
    // console.log(numbers);
    // setTimeout(() => {
    //   const StartCounting = () => {
    //     console.log(numbers[i]);
    //     // number.current.style.transition = "200ms";
    //     if (i >= 0 && i < howManyNumbers) {
    //       // number.current.style.transition = "200ms";
    //       // number.current.style.visibility = "hidden";
    //       const data = actualNumber + 1;
    //       // console.log(numbers[i]);
    //       setActualNumber(numbers[i]);
    //       suma = suma + numbers[i];
    //       setSum(suma);
    //       // number.current.style.visibility = "visible";
    //       i++;
    //     }
    //     if (i === howManyNumbers) {
    //       setFinish(true);
    //       // clearInterval(counting);
    //       console.log("koniec");
    //     }
    //   };
    //   const counting = setInterval(() => {
    //     if (i >= 0 && i < howManyNumbers) {
    //       StartCounting();
    //     } else {
    //       clearInterval(counting);
    //       setNumbers([]);
    //       // setActualNumber("");
    //     }
    //   }, howMuchTime);

    //   StartCounting();
    // }, 2000);
  };

  return (
    <div className="md:w-[800px] w-[90vw] mx-auto flex justify-center items-center h-[400px] relative bg-white rounded-[20px] shadow-[15px_25px_30px_0px_rgba(0,0,0,0.3)] mt-[16vh] md:mt-0">
      <div className="h-auto w-[700px] mx-auto relative">
        <div className="flex">
          <div className="md:w-1/2">
            <p className="text-[18px] md:text-right text-left md:pr-[30px] pl-[52px]">
              Wybierz poziom trudności:
            </p>
            <NumbersStarter
              advanceSearch={advanceSearch}
              setAdvanceSearch={setAdvanceSearch}
              levelChoosed={levelChoosed}
              numbers={numbers}
              setNumbers={setNumbers}
              setLevelChoosed={setLevelChoosed}
              howMuchTime={howMuchTime}
              setHowMuchTime={setHowMuchTime}
              howManyNumbers={howManyNumbers}
              setHowManyNumbers={setHowManyNumbers}
            />
            <NumbersBasic
              advanceSearch={advanceSearch}
              setAdvanceSearch={setAdvanceSearch}
              numbers={numbers}
              setNumbers={setNumbers}
              levelChoosed={levelChoosed}
              setLevelChoosed={setLevelChoosed}
              howManyNumbers={howManyNumbers}
              setHowManyNumbers={setHowManyNumbers}
              howMuchTime={howMuchTime}
              setHowMuchTime={setHowMuchTime}
            />
            <NumbersAdvance
              advanceSearch={advanceSearch}
              setAdvanceSearch={setAdvanceSearch}
              numbers={numbers}
              setNumbers={setNumbers}
              levelChoosed={levelChoosed}
              setLevelChoosed={setLevelChoosed}
              howManyNumbers={howManyNumbers}
              setHowManyNumbers={setHowManyNumbers}
              howMuchTime={howMuchTime}
              setHowMuchTime={setHowMuchTime}
              trigger={trigger}
              setTrigger={setTrigger}
              sum={sum}
              setSum={setSum}
              finish={finish}
              setFinish={setFinish}
            />
            <NumbersRandom
              advanceSearch={advanceSearch}
              setAdvanceSearch={setAdvanceSearch}
              numbers={numbers}
              setNumbers={setNumbers}
              levelChoosed={levelChoosed}
              setLevelChoosed={setLevelChoosed}
              howManyNumbers={howManyNumbers}
              setHowManyNumbers={setHowManyNumbers}
              howMuchTime={howMuchTime}
              setHowMuchTime={setHowMuchTime}
              activeSet={activeSet}
              setActiveSet={setActiveSet}
              setsOfNumbers={setsOfNumbers}
              setSetsOfNumbers={setSetsOfNumbers}
              trigger={trigger}
              setTrigger={setTrigger}
              setsFromTeacher={setsFromTeacher}
              setSetsFromTeacher={setSetsFromTeacher}
              setsOfNumbersLength={setsOfNumbersLength}
              setSetsOfNumbersLength={setSetsOfNumbersLength}
              activeSetNumber={activeSetNumber}
              setActiveSetNumber={setActiveSetNumber}
            />
          </div>
          <div className="w-1/2 hidden md:flex justify-center items-center">
            <Image src="/logo.jpeg" width={480} height={100} alt="logo" />
          </div>
        </div>
        <div
          className={
            levelChoosed !== 0
              ? "h-[75px] absolute my-[20px] w-full flex justify-center duration-200"
              : "h-[0px] duration-200 absolute my-[20px] w-full flex justify-center overflow-hidden"
          }
        >
          <div
            className="bg-[#6AC925] text-[40px] text-white px-[40px] py-[5px] rounded-[40px] cursor-pointer duration-200 hover:bg-[#7856B8]"
            onClick={startCounting}
          >
            Zaczynajmy!
          </div>
        </div>
      </div>
    </div>
  );
}
