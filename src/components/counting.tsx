import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import Sound from "react-sound";

interface Props {
  startCounting: any;
  actualNumber: any;
  setActualNumber: React.Dispatch<React.SetStateAction<any>>;
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<any>>;
  finish: any;
  setFinish: React.Dispatch<React.SetStateAction<any>>;
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  levelChoosed: any;
  setLevelChoosed: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
  sum: any;
  setSum: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  activeSet: any;
  setActiveSet: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbers: any;
  setSetsOfNumbers: React.Dispatch<React.SetStateAction<any>>;
  activeSetNumber: any;
  setActiveSetNumber: React.Dispatch<React.SetStateAction<any>>;
  setsOfNumbersLength: any;
  setSetsOfNumbersLength: React.Dispatch<React.SetStateAction<any>>;
  counter: any;
  result: any;
}

export default function Counting({
  actualNumber,
  setActualNumber,
  trigger,
  setTrigger,
  finish,
  setFinish,
  howManyNumbers,
  setHowManyNumbers,
  levelChoosed,
  setLevelChoosed,
  howMuchTime,
  setHowMuchTime,
  sum,
  setSum,
  numbers,
  setNumbers,
  activeSet,
  setActiveSet,
  setsOfNumbers,
  setSetsOfNumbers,
  activeSetNumber,
  setActiveSetNumber,
  counter,
  result,
  startCounting,
  setsOfNumbersLength,
}: Props) {
  const number: any = useRef();
  // const counter: any = useRef();
  // const result: any = useRef();

  const music: any = useRef();

  const handleClosingAnswer = () => {
    setIsExploding(false);
    setTrigger(false);
    setFinish(false);
    setLevelChoosed(0);
    setNumbers([]);
    counter.current.innerHTML = "";
    result.current.style.display = "none";
  };

  const handleNextTask = () => {
    setFinish(false);
    setIsExploding(false);
    setActiveSetNumber(activeSetNumber + 1);
    setNumbers(setsOfNumbers[0].numbers[activeSetNumber + 1]);
    setHowManyNumbers(setsOfNumbers[0].numbers[activeSetNumber + 1].length);
    // setTrigger(false);
    // setLevelChoosed(0);
    // setNumbers([]);
    counter.current.innerHTML = "";
    result.current.style.display = "none";
  };

  const [isExploding, setIsExploding] = useState(false);
  const [answer, setAnswer] = useState<any | null>(null);

  const handleAnswer = (e: any) => {
    e.preventDefault();
    let suma: number = 0;
    numbers.map((i: number) => {
      suma = suma + i;
    });

    console.log(suma);
    console.log(answer);

    if (parseInt(answer) === suma) {
      setIsExploding(true);
      music.current.play();
    }
  };

  const hadleInputData = (e: any) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  // const startCounting = () => {
  //   if (trigger === true && finish === false) {
  //     console.log(trigger);
  //     let i = 0;
  //     console.log(i);
  //     let suma: number = 0;
  //     console.log(numbers);
  //     setTimeout(() => {
  //       const StartCounting = () => {
  //         counter.current.style.color = "white";
  //         console.log(numbers[i]);
  //         setTimeout(() => {
  //           counter.current.style.color = "#23c55e";
  //         }, howMuchTime - 100);
  //         if (i >= 0 && i < howManyNumbers) {
  //           counter.current.innerHTML = numbers[i];
  //           const data = actualNumber + 1;
  //           // console.log(numbers[i]);
  //           setActualNumber(numbers[i]);
  //           suma = suma + numbers[i];
  //           setSum(suma);
  //           i++;
  //         }
  //         if (i === howManyNumbers) {
  //           setFinish(true);
  //           counter.current.style.color = "#23c55e";
  //           result.current.style.display = "block";
  //           clearInterval(counting);
  //           console.log("koniec");
  //         }
  //       };

  //       const counting = setInterval(StartCounting, howMuchTime);

  //       StartCounting();
  //     }, 2000);
  //   }
  // };

  console.log(activeSetNumber);
  console.log(setsOfNumbersLength);

  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    zIndex: 999,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  };

  return (
    <>
      <div
        ref={number}
        className={
          trigger === true
            ? "fixed bg-green-500 w-screen h-screen mx-auto top-[0px] left-0 right-0 text-[350px] text-center duration-200 shadow-xl z-20 text-white flex justify-center items-center flex-col overflow-hidden"
            : "bg-white h-[0px] w-[700px] overflow-hidden fixed top-[50px]"
        }
      >
        <audio ref={music} src="/victory.mp3"></audio>
        {isExploding === true && <ConfettiExplosion {...largeProps} />}
        <div
          className="absolute left-0 top-0 w-[20px] h-[25px] text-[20px]"
          onClick={handleClosingAnswer}
        >
          X
        </div>
        {trigger === true && finish === false && (
          <div className="absolute top-[0px] w-screen h-[30px] loader">
            <div className="loading-grow"></div>
          </div>
        )}
        <div ref={counter} className="duration-100"></div>
        {/* <div
          onClick={checkResult}
          className={
            finish
              ? "w-[500px] absolute h-[70px] mx-auto top-[530px] left-0 right-0 text-[40px] text-center duration-200 bg-[#7856B8] text-white leading-2 rounded-[10px] overflow-hidden cursor-pointer"
              : "w-[500px] absolute mx-auto top-[430px] left-0 right-0 text-[50px] text-center duration-200 h-[0px] overflow-hidden"
          }
        >
          Sprawdź wynik
        </div> */}
      </div>
      <div
        ref={result}
        className="w-[500px] h-[290px] absolute mx-auto top-[140px] left-0 right-0 text-[50px] text-center duration-200 items-center hidden
        px-[10px] z-30"
      >
        <form
          onSubmit={handleAnswer}
          className="flex flex-col justify-evenly items-center w-full min-h-[90%]"
        >
          <p className="text-[24px] text-white mb-[10px]">Twoja odpowiedź:</p>
          <input
            required
            className=" w-[300px] text-center mb-[40px] rounded-[15px]"
            value={answer}
            type="number"
            onChange={hadleInputData}
          ></input>
          <button className="text-[30px] bg-[#7856B8] text-white px-[0px] rounded-[15px] w-[300px] mb-[5px]">
            Sprawdź wynik
          </button>
          {activeSetNumber < setsOfNumbersLength - 1 && (
            <div
              className="text-[30px] bg-[#7856B8] text-white px-[0px] rounded-[15px] w-[300px] cursor-pointer mb-[5px]"
              onClick={handleNextTask}
            >
              Następny zestaw
            </div>
          )}
          <div
            className="text-[30px] bg-red-500 text-white px-[50px] rounded-[15px] w-[300px] cursor-pointer"
            onClick={handleClosingAnswer}
          >
            Zamknij
          </div>
          {/* <div className="text-[30px] w-[300px] mx-auto">
            {sum === finishAnwer && finishAnwer !== 0 && (
              <p>{sum} To poprawna odpowiedź. Gratulacje!</p>
            )}
            {sum !== finishAnwer && finishAnwer !== 0 && (
              <p>Niestety poprawna odpowiedź to {sum}</p>
            )}
          </div> */}
        </form>
      </div>
    </>
  );
}
