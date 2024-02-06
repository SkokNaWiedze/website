import React, { useRef } from "react";
import Image from "next/image";
import Numbers from "./numbers";
import Complexity from "./complexity";
import Time from "./time";
import { FaInfoCircle } from "react-icons/fa";

interface Props {
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  complexity: any;
  setComplexity: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<any>>;
  answer: any;
  setAnswer: React.Dispatch<React.SetStateAction<any>>;
  actualNumber: any;
  setActualNumber: React.Dispatch<React.SetStateAction<any>>;
  sum: any;
  setSum: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  finish: any;
  setFinish: React.Dispatch<React.SetStateAction<any>>;
  finishAnwer: any;
  setFinishAnswer: React.Dispatch<React.SetStateAction<any>>;
  advanceSearch: any;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<any>>;
}

export default function Advancesearch({
  howManyNumbers,
  setHowManyNumbers,
  complexity,
  setComplexity,
  howMuchTime,
  setHowMuchTime,
  trigger,
  setTrigger,
  answer,
  setAnswer,
  actualNumber,
  setActualNumber,
  sum,
  setSum,
  numbers,
  setNumbers,
  finish,
  setFinish,
  finishAnwer,
  setFinishAnswer,
  advanceSearch,
  setAdvanceSearch,
}: Props) {
  const advanceLvl: any = useRef();

  const result: any = useRef();

  const hanldeAnswer = (e: any) => {
    e.preventDefault();
    setFinishAnswer(answer);
  };

  const hadleInputData = (e: any) => {
    // console.log(answer);
    setAnswer(parseInt(e.target.value));
  };

  const checkResult = () => {
    result.current.style.display = "flex";
  };

  return (
    <div
      ref={advanceLvl}
      className={
        advanceSearch === true
          ? "bg-white absolute top-[30px] left-[350px] right-0 mx-auto h-[270px] w-[340px] py-[8px] px-[12px] duration-300 overflow-hidden border "
          : "bg-white absolute top-[244px] -left-[290px] right-0 mx-auto h-[50px] w-[320px] px-[12px] duration-300 overflow-hidden"
      }
    >
      <div className="absolute right-0 w-[30px] h-[30px] mr-[10px] text-[#7856B8] cursor-pointer">
        <FaInfoCircle className="w-full h-full" />
      </div>
      <div className="w-full flex">
        <div className="w-[300px]">
          <Numbers howManyNumbers={howManyNumbers} setHowManyNumbers={setHowManyNumbers} />
          <Complexity complexity={complexity} setComplexity={setComplexity} />
        </div>
        <div className="w-full flex justify-center items-center ">
          <Image src="/logo.jpeg" width={480} height={100} alt="logo" />
        </div>
      </div>
      <Time howMuchTime={howMuchTime} setHowMuchTime={setHowMuchTime} />
    </div>
  );
}
