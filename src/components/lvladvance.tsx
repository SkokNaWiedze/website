import React, { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Advancesearch from "./advancesearch";

interface QueryParams {
  levelChoosed: any;
  setLevelChoosed: React.Dispatch<React.SetStateAction<any>>;
  advanceSearch: any;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<any>>;
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  // complexity: any;
  // setComplexity: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<any>>;
  // answer: any;
  // setAnswer: React.Dispatch<React.SetStateAction<any>>;
  // actualNumber: any;
  // setActualNumber: React.Dispatch<React.SetStateAction<any>>;
  sum: any;
  setSum: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  finish: any;
  setFinish: React.Dispatch<React.SetStateAction<any>>;
  //   finishAnwer: any;
  //   setFinishAnswer: React.Dispatch<React.SetStateAction<any>>;
}

export default function NumbersAdvance({
  levelChoosed,
  setLevelChoosed,
  advanceSearch,
  setAdvanceSearch,
  howManyNumbers,
  setHowManyNumbers,
  // complexity,
  // setComplexity,
  howMuchTime,
  setHowMuchTime,
  trigger,
  setTrigger,
  // answer,
  // setAnswer,
  // actualNumber,
  // setActualNumber,
  sum,
  setSum,
  numbers,
  setNumbers,
  finish,
  setFinish,
}: // finishAnwer,
// setFinishAnswer,
QueryParams) {
  const [numberOfNumbers, setNumberOfNumbers] = useState(4);
  const descAdvance: any = useRef();

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
    console.log(Math.random() * 2 - 1);
    let result = firstNumber + num;
    console.log(result);

    for (;;) {
      if (result < 0 || result > starterNextNumbers[1]) {
        console.log("calculating, number is " + result);
        (num = Math.round((Math.random() * 2 - 1) * starterFirstNumber[1])),
          console.log("new num is " + num);
        result = firstNumber + num;
      } else {
        console.log("returning " + num);
        return num;
      }
    }
  };

  const findNumbers = async () => {
    setAdvanceSearch(true);
    setLevelChoosed(3);
    let i = 1;
    let NumsArray: any = [];

    //fist number at the first fire up
    let lastNumber = Math.floor(Math.random() * starterFirstNumber[1] + 1);
    console.log(lastNumber);

    for (i > 0; i <= numberOfNumbers; i++) {
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
    // setNumbers(NumsArray);
  };

  const handleInfodescAdvance = () => {
    descAdvance.current.style.height = "100px";
    descAdvance.current.style.border = "0.3px solid black";
  };

  const handleInfodescAdvanceHiding = () => {
    descAdvance.current.style.height = "0px";
    descAdvance.current.style.border = "0px";
  };

  return (
    <div className="my-[10px] flex items-center">
      {/* <Advancesearch
        howManyNumbers={howManyNumbers}
        setHowManyNumbers={setHowManyNumbers}
        complexity={complexity}
        setComplexity={setComplexity}
        howMuchTime={howMuchTime}
        setHowMuchTime={setHowMuchTime}
        trigger={trigger}
        setTrigger={setTrigger}
        answer={answer}
        setAnswer={setAnswer}
        actualNumber={actualNumber}
        setActualNumber={setActualNumber}
        sum={sum}
        setSum={setSum}
        numbers={numbers}
        setNumbers={setNumbers}
        finish={finish}
        setFinish={setFinish}
        finishAnwer={finishAnwer}
        setFinishAnswer={setFinishAnswer}
        advanceSearch={advanceSearch}
        setAdvanceSearch={setAdvanceSearch}
      /> */}
      <div>
        <div
          ref={descAdvance}
          className="absolute w-[400px] h-[0px] bg-white left-[350px] overflow-hidden duration-200 shadow-xl z-10"
        >
          <p className="p-[10px]">
            Losujesz wszystkie możliwe liczby (tak naprawdę od 0 - 99) i ile chcesz, nawet se czas
            możesz skrócić jak prawdziwy madafaka...
          </p>
        </div>
      </div>
      <div
        data-name="starter"
        className={
          levelChoosed === 3
            ? "duration-200 text-center text-white text-[40px] px-[10px] py-[6px] bg-[#7856B8] w-[320px] mb-[5px] cursor-pointer rounded-[10px] hover:bg-[#7856B8] hover:text-white z-10"
            : "duration-200 text-center text-[40px] px-[10px] py-[6px] bg-[#49DEE6] w-[320px] mb-[5px] cursor-pointer rounded-[10px] hover:bg-[#7856B8] hover:text-white z-10"
        }
        onClick={findNumbers}
      >
        Nowe wyzwania
      </div>
      {/* <div className="w-[30px] h-[30px] ml-[10px] text-[#7856B8] cursor-pointer">
        <FaInfoCircle
          className="w-full h-full"
          onMouseOver={handleInfodescAdvance}
          onMouseLeave={handleInfodescAdvanceHiding}
        />
      </div> */}
    </div>
  );
}
