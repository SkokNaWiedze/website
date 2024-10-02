import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import { useRouter } from "next/navigation";

interface Props {
  handlePreparingGame: any;
  handleLookingForLastSolvedSet: any;
  actualNumber: any;
  setActualNumber: React.Dispatch<React.SetStateAction<any>>;
  showedCountingView: any;
  setShowedCountingView: React.Dispatch<React.SetStateAction<any>>;
  finish: any;
  setFinish: React.Dispatch<React.SetStateAction<any>>;
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
  sum: any;
  setSum: React.Dispatch<React.SetStateAction<any>>;
  numbers: any;
  setNumbers: React.Dispatch<React.SetStateAction<any>>;
  activeSet: any;
  setActiveSet: React.Dispatch<React.SetStateAction<any>>;
  isExploding: any;
  setIsExploding: any;
  answer: any;
  setAnswer: any;
  counter: any;
  result: any;
}

export default function CountingGame({
  actualNumber,
  handleLookingForLastSolvedSet,
  setActualNumber,
  showedCountingView,
  setShowedCountingView,
  finish,
  setFinish,
  howManyNumbers,
  setHowManyNumbers,
  howMuchTime,
  setHowMuchTime,
  sum,
  setSum,
  numbers,
  setNumbers,
  activeSet,
  setActiveSet,
  counter,
  result,
  handlePreparingGame,
  answer,
  setAnswer,
  isExploding,
  setIsExploding,
}: Props) {
  const number: any = useRef();
  const music: any = useRef();
  const musicFinal: any = useRef();
  const musicBad: any = useRef();
  const setFinishPopUp: any = useRef();

  const router = useRouter();

  const handleClosingAnswer = () => {
    // counter.current.innerHTML = "";
    // result.current.style.display = "none";
    // setShowedCountingView(false);
    // setFinish(false);
    // setActiveSet("");
    // setIsExploding(false);
    // setAnswer("");
    // setActualNumber(0);
    // setNumbers([]);

    router.refresh();
  };

  const handleAnswer = (e: any) => {
    e.preventDefault();
    let suma: number = 0;
    numbers.map((i: number) => {
      suma = suma + i;
    });

    // console.log(sum);
    // console.log(answer);

    if (parseInt(answer) === sum && activeSet !== numbers[0].length) {
      setIsExploding(true);
      music.current.play();
    } else if (parseInt(answer) !== sum && activeSet !== numbers[0].length) {
      musicBad.current.play();
    }

    // const result = handleLookingForLastSolvedSet(setFinishPopUp);
    console.log(handleLookingForLastSolvedSet(setFinishPopUp, musicFinal));
  };

  const hadleInputData = (e: any) => {
    setAnswer(e.target.value);
    console.log(answer);
  };
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
          showedCountingView === true
            ? "fixed bg-green-500 w-screen h-screen mx-auto top-[0px] left-0 right-0 text-[350px] text-center duration-200 shadow-xl z-30 text-white flex justify-center items-center flex-col overflow-hidden"
            : "bg-white h-[0px] w-[700px] overflow-hidden fixed top-[50px]"
        }
      >
        <div
          ref={setFinishPopUp}
          className="absolute md:w-[400px] w-[90vw] mx-auto h-[400px] bg-blue-600 rounded-xl p-[20px] hidden  flex-col justify-evenly"
        >
          <p className="text-[30px]">To był ostatni zestaw liczb na tym poziomie. </p>
          <p className="text-[50px] font-bold">Gratulacje :)</p>
          <p className="text-[20px] italic">Wracamy do ekranu głównego ...</p>
        </div>
        <audio ref={music} src="/victory.mp3"></audio>
        <audio ref={musicFinal} src="/victorySet.mp3"></audio>
        <audio ref={musicBad} src="/bad_answer.mp3"></audio>
        {isExploding === true && <ConfettiExplosion {...largeProps} />}
        <div
          className="absolute left-0 top-0 w-[20px] h-[25px] text-[20px]"
          onClick={handleClosingAnswer}
        >
          X
        </div>
        {showedCountingView === true && finish === false && (
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
        className="md:w-[500px] h-[290px] absolute mx-auto top-[140px] left-0 right-0 text-[50px] text-center duration-200 items-center hidden
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
          <div
            data-value="nextBtn"
            className={`${
              isExploding === false && "bg-gray-200/[0.45] text-gray-400/[0.9]"
            } " text-[30px] bg-[#7856B8] text-white px-[0px] rounded-[15px] w-[300px] cursor-pointer mb-[5px] "
            onClick={handlePreparingGame}`}
            onClick={handlePreparingGame}
          >
            Następny zestaw
          </div>
          <div
            className="text-[30px] bg-red-500 text-white px-[50px] rounded-[15px] w-[300px] cursor-pointer"
            onClick={handleClosingAnswer}
          >
            Zamknij
          </div>
        </form>
      </div>
    </>
  );
}
