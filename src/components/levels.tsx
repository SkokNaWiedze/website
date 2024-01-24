import React from "react";
import { useState } from "react";
import Image from "next/image";
import NumbersStarter from "@/components/lvlstarter";
import NumbersAdvance from "./lvladvance";
import NumbersBasic from "./lvlbasic";
import NumbersRandom from "./lvlrandom";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import Complexity from "./complexity";

interface Props {
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
}: Props) {
  const handleAdvanceSearch = () => {
    setAdvanceSearch(true);
  };

  const [isExploding, setIsExploding] = useState(false);

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

  const confetti = () => {
    setIsExploding(true);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen relative">
      <div className="h-auto w-[700px] mx-auto relative">
        <div className="flex">
          <div className="w-1/2">
            <p className="text-[26px] text-center">Wybierz poziom trudności:</p>
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
            />
          </div>
          <div className="w-1/2 flex justify-center items-center">
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
            onClick={handleTrigger}
          >
            Zaczynajmy!
          </div>
        </div>
      </div>
    </div>
  );
}
