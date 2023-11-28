import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";

interface Props {
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
}: Props) {
  const number: any = useRef();
  const counter: any = useRef();
  const result: any = useRef();

  const handleClosingAnswer = () => {
    setIsExploding(false);
    setTrigger(false);
    setFinish(false);
    setLevelChoosed(0);
    setNumbers([]);
    counter.current.innerHTML = "";
    result.current.style.display = "none";
  };

  const handleNextTsk = () => {
    setFinish(false);
    setIsExploding(false);
    // setTrigger(false);
    setFinish(false);
    // setLevelChoosed(0);
    // setNumbers([]);
    counter.current.innerHTML = "";
    result.current.style.display = "none";
  };

  const [isExploding, setIsExploding] = useState(false);
  const [answer, setAnswer] = useState();

  const checkResult = () => {
    result.current.style.display = "block";
  };

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
    }
  };

  const hadleInputData = (e: any) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  useEffect(() => {
    if (trigger === true && finish === false) {
      console.log(trigger);
      let i = 0;
      console.log(i);
      let suma: number = 0;
      console.log(numbers);
      setTimeout(() => {
        const StartCounting = () => {
          counter.current.style.color = "white";
          console.log(numbers[i]);
          setTimeout(() => {
            counter.current.style.color = "#23c55e";
          }, howMuchTime - 100);
          if (i >= 0 && i < howManyNumbers) {
            counter.current.innerHTML = numbers[i];
            const data = actualNumber + 1;
            // console.log(numbers[i]);
            setActualNumber(numbers[i]);
            suma = suma + numbers[i];
            setSum(suma);
            i++;
          }
          if (i === howManyNumbers) {
            setFinish(true);
            counter.current.style.color = "#23c55e";
            result.current.style.display = "block";
            clearInterval(counting);
            console.log("koniec");
          }
        };

        const counting = setInterval(StartCounting, howMuchTime);

        StartCounting();
      }, 2000);
    }
  }, [trigger, finish]);

  const largeProps: ConfettiProps = {
    force: 0.8,
    duration: 3000,
    particleCount: 300,
    zIndex: 99,
    width: 1600,
    colors: ["#041E43", "#1471BF", "#5BB4DC", "#FC027B", "#66D805"],
  };

  return (
    <>
      <div
        ref={number}
        className={
          trigger === true
            ? "bg-green-500 w-screen h-screen absolute mx-auto top-[0px] left-0 right-0 text-[350px] text-center duration-200 shadow-xl  z-20 text-white flex justify-center items-center flex-col"
            : "bg-white h-[0px] w-[700px] overflow-hidden absolute top-[50px]"
        }
      >
        {isExploding === true && <ConfettiExplosion {...largeProps} />}
        <div
          className="absolute left-0 top-0 w-[20px] h-[30px] text-[20px]"
          onClick={handleClosingAnswer}
        >
          X
        </div>
        {trigger === true && finish === false && (
          <div className="absolute top-[0px] w-screen h-[10px] loader">
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
          className="flex flex-col justify-evenly items-center w-full h-full"
        >
          <p className="text-[24px] text-white mb-[10px]">Twoja odpowiedź:</p>
          <input
            required
            className="border-2 w-[300px] text-center"
            value={answer}
            type="number"
            onChange={hadleInputData}
          ></input>
          <button className="text-[30px] bg-[#7856B8] text-white px-[50px] rounded-[5px] w-[400px]">
            Sprawdź wynik
          </button>
          <div
            className="text-[30px] bg-[#7856B8] text-white px-[50px] rounded-[5px] w-[400px] cursor-pointer"
            onClick={handleNextTsk}
          >
            Następny zestaw
          </div>
          <div
            className="text-[30px] bg-[#7856B8] text-white px-[50px] rounded-[5px] w-[400px] cursor-pointer"
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
