import React, { use, useContext, useEffect, useState, useRef } from "react";
import HeaderAccount from "@/components/headerAccount";
import Head from "next/head";
import { AppContext } from "@/context";
import { useRouter } from "next/navigation";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Image from "next/image";
import { FaRegStar, FaStar } from "react-icons/fa";

import CountingGame from "@/components/countingGame";

import AddNewSet from "@/components/addNewSet";

export default function Account() {
  const loader: any = useRef();
  const newAccount: any = useRef();
  const counter: any = useRef();
  const result: any = useRef();

  const router = useRouter();

  const [showedCountingView, setShowedCountingView] = useState(false);
  const [finish, setFinish] = useState(false);
  const [isCounting, setIsCounting] = useState(false);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [gameData, setGameData] = useState<any>();
  const [activeSetName, setActiveSetName] = useState();
  const [answer, setAnswer] = useState<any | null>(null);

  const [activeSet, setActiveSet] = useState(0);
  const [howMuchTime, setHowMuchTime] = useState(500);
  const [numbers, setNumbers] = useState<any>([]);
  const [actualNumber, setActualNumber] = useState("");
  const [howManyNumbers, setHowManyNumbers]: any = useState(0);
  const [sum, setSum]: any = useState(1);
  const [isTheLastSet, setIsTheLastSet] = useState(false);

  const [isExploding, setIsExploding] = useState(false);

  const [timeStringValue, setTimeStringValue] = useState("onesecond");

  const { LoggedUser, setLoggedUser } = useContext(AppContext);

  const getAllDataFromDB = async () => {
    const Login = await LoggedUser;

    let query = JSON.stringify({
      name: Login,
    });

    let data = await fetch("/api/getGameDataFromDB", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const returned = await data.json();
    console.log(returned.NumbersData);
    setGameData(returned.NumbersData);
    setIsDataLoaded(true);
  };

  const handleChangingTime = (e: any) => {
    const data = e.target.id;
    setTimeStringValue(data);

    if (data === "halfsecond") {
      setHowMuchTime(500);
    } else if (data === "onesecond") {
      setHowMuchTime(1000);
    } else if (data === "twoseconds") {
      setHowMuchTime(2000);
    }
  };

  const handlePreparingGame = (e: any) => {
    console.log("Preparing!");
    const dataName = e.currentTarget.getAttribute("data-value");
    console.log(dataName);
    let actualSetToCount = activeSet;

    if (
      (isExploding === true && dataName === "nextBtn") ||
      (isExploding === false && dataName !== "nextBtn")
    ) {
      counter.current.innerHTML = "";
      result.current.style.display = "none";
      setAnswer("");
      setFinish(false);
      setIsExploding(false);

      if (dataName !== "nextBtn") {
        setActiveSetName(dataName);
      } else {
        // actualSetToCount = actualSetToCount + 1;
        // setActiveSet(activeSet + 1);
      }
      console.log(activeSetName);
      const numbersFiltered = gameData.map((i: any, index: number) => {
        // console.log(dataName);
        if (i.name === dataName || i.name === activeSetName) {
          const dataReturned = i.numbers.map((e: any, index: number) => {
            return e.set;
          });
          return dataReturned;
        }
      });

      const numbers = numbersFiltered.filter((i: any) => i !== undefined);

      console.log(numbers.filter((i: any) => i !== undefined));
      console.log(numbers[0][actualSetToCount].length);

      setNumbers(numbers.filter((i: any) => i !== undefined));
      setHowManyNumbers(numbers[0][actualSetToCount].length);

      // console.log(numbers);

      setShowedCountingView(true);
      setFinish(false);
      setIsCounting(true);
    }
  };

  const startCounting = () => {
    let i = 0;
    console.log(i);
    let suma: number = 0;

    setTimeout(() => {
      const StartCounting = () => {
        counter.current.style.color = "white";
        // console.log(numbers);
        setTimeout(() => {
          counter.current.style.color = "#23c55e";
        }, howMuchTime - 100);
        if (i >= 0 && i < howManyNumbers) {
          // console.log(i);
          // console.log(numbers[0][activeSet]);
          counter.current.innerHTML = numbers[0][activeSet][i];
          const data = actualNumber + 1;
          // console.log(numbers[i]);
          setActualNumber(numbers[0][activeSet][i]);

          suma = suma + parseInt(numbers[0][activeSet][i]);
          // console.log(suma);
          setSum(suma);
          i++;
        } else if (i === howManyNumbers) {
          setFinish(true);
          setActiveSet(activeSet + 1);
          counter.current.style.color = "#23c55e";
          result.current.style.display = "block";
          clearInterval(counting);
          console.log("koniec");
          setIsCounting(false);
        }
      };

      const counting: any = setInterval(StartCounting, howMuchTime);

      StartCounting();
    }, 2000);
  };

  //function is launched agter every answer
  const handleLookingForLastSolvedSet = async (setFinishPopUp: any, musicFinal: any) => {
    if (parseInt(answer) === sum) {
      console.log(activeSet);
      console.log(numbers[0].length);

      if (activeSet === numbers[0].length) {
        console.log("To był ostatni zestaw");
        result.current.style.display = "none";
        setFinishPopUp.current.style.display = "flex";
        setIsExploding(true);
        musicFinal.current.play();

        await handleActualizingDataBaseAfterSolvedSet();

        setTimeout(async () => {
          router.refresh();
        }, 4000);
      }
    }

    return "Solved";
  };

  const handleActualizingDataBaseAfterSolvedSet = async () => {
    const res = await fetch("api/actualizeDataAfterSolvedSet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        setname: activeSetName,
        user: LoggedUser,
      }),
    });
  };

  const YourSets = gameData?.map((i: any) => {
    if (i.access.includes(LoggedUser) || i.id === 1) {
      return (
        <div key={i} className="flex my-[10px] justify-between py-[5px] border">
          {/* <div
            className="cursor-pointer bg-gray-500"
            onClick={handleActualizingDataBaseAfterSolvedSet}
          >
            Fire!
          </div> */}
          <div className="flex items-start border-b-[2px] border-green-500 pb-[10px] w-[95%] mx-auto">
            <div className="bg-[#F36D6B] h-[30px] w-[150px] px-[10px] rounded-[3px] text-[20px] text-white">
              {i.name}
            </div>
            <div className=" min-w-[80px] h-full flex mx-[15px] justify-end flex-1 items-center flex-wrap">
              {i.numbers?.map((s: any) => {
                if (i.solved.includes("Robercik")) {
                  return <FaStar className="md:w-[30px] md:h-[30px] md:mx-[3px] text-blue-500" />;
                } else {
                  return (
                    <FaRegStar className="md:w-[30px] md:h-[30px] md:mx-[3px] text-blue-500" />
                  );
                }
              })}
            </div>
            <form
              className="flex h-full"
              // onSubmit={(e) => handleDeletingSetFromDB(e, i.table_name)}
            >
              <div
                data-value={i.name}
                className=" text-white  h-[25px] mr-[3px]"
                onClick={handlePreparingGame}
              >
                <p className="cursor-pointer md:w-[120px] px-[5px] text-center text-[20px] bg-green-500 h-[30px] rounded-[5px]">
                  Start
                </p>
              </div>
            </form>
          </div>
        </div>
      );
      // }
    }
  });

  useEffect(() => {
    getAllDataFromDB();
  }, []);

  useEffect(() => {
    if (isCounting === true) {
      startCounting();
    }
  }, [isCounting]);

  return (
    <>
      <Head>
        <title>Skok na Wiedzę</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CountingGame
        //functions
        handlePreparingGame={handlePreparingGame}
        handleLookingForLastSolvedSet={handleLookingForLastSolvedSet}
        //
        actualNumber={actualNumber}
        setActualNumber={setActualNumber}
        showedCountingView={showedCountingView}
        setShowedCountingView={setShowedCountingView}
        finish={finish}
        setFinish={setFinish}
        howManyNumbers={howManyNumbers}
        setHowManyNumbers={setHowManyNumbers}
        numbers={numbers}
        setNumbers={setNumbers}
        howMuchTime={howMuchTime}
        setHowMuchTime={setHowMuchTime}
        activeSet={activeSet}
        setActiveSet={setActiveSet}
        sum={sum}
        setSum={setSum}
        counter={counter}
        result={result}
        answer={answer}
        setAnswer={setAnswer}
        isExploding={isExploding}
        setIsExploding={setIsExploding}
      />
      <div className="bg-[url('/background.jpeg')] bg-down bg-cover bg-fixed h-screen">
        {isDataLoaded === false && (
          <div
            ref={loader}
            className="fixed w-screen h-screen bg-white/[0.7] z-50 flex items-center justify-center"
          >
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-[100px] h-[100px] text-gray-200 animate-spin dark:text-red-100 fill-green-600 rounded-[50%]"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="fixed w-screen bg-white shadow-md z-20">
          <HeaderAccount newAccount={newAccount} />
        </div>
        <p className="mb-[20px] pt-[100px] font-bold text-[20px] m-auto md:w-[1050px] w-[85vw]">
          <p className="text-white font-semibold">Twoje postępy:</p>
        </p>

        <div className="w-[80vw] mx-auto min-h-[100px] my-[10px]  rounded-[10px] shadow-xl bg-white">
          <div className="p-[10px]">
            <div className="flex w-[90%] md:w-[400px] justify-evenly h-full mb-[40px] items-center flex-col md:flex-row mx-auto md:mx-0">
              <p className="font-bold">Czas wyświetlenia liczby</p>
              <div className="flex w-[200px] justify-evenly ">
                <div
                  id="handfsecond"
                  onClick={handleChangingTime}
                  className={`${
                    timeStringValue === "handfsecond" && "bg-blue-500 text-white font-bold border"
                  } "px-[4px] rounded-md h-full w-[48px] text-center leading-[30px] border-blue-500 border cursor-pointer "`}
                >
                  0,5 s
                </div>
                <div
                  id="onesecond"
                  onClick={handleChangingTime}
                  className={`${
                    timeStringValue === "onesecond" && "bg-blue-500 text-white font-bold border"
                  } "px-[4px] rounded-md h-full w-[48px] text-center leading-[30px] border-blue-500 border cursor-pointer "`}
                >
                  1 s
                </div>
                <div
                  id="twoseconds"
                  onClick={handleChangingTime}
                  className={`${
                    timeStringValue === "twoseconds" && "bg-blue-500 text-white font-bold border"
                  } "px-[4px] rounded-md h-full w-[48px] text-center leading-[30px] border-blue-500 border cursor-pointer "`}
                >
                  2 s
                </div>
              </div>
            </div>

            <div id="data=base">{YourSets}</div>
          </div>
        </div>
      </div>
    </>
  );
}
