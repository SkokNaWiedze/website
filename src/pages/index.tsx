import Image from "next/image";
import HeaderRandom from "@/components/headerRandom";
import Numbers from "@/components/numbers";
import Time from "@/components/time";
import { useEffect, useState, useRef, useContext } from "react";
import { Inter } from "next/font/google";
import Complexity from "@/components/complexity";
import Start from "@/components/start";
import Levels from "@/components/levels";
import NumbersStarter from "../components/lvlstarter";
import Advancesearch from "@/components/advancesearch";
import Counting from "@/components/counting";
import { AppContext } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { LoggedUser, setLoggedUser, userType, setUserType } = useContext(AppContext);
  console.log(LoggedUser);

  const [state, setState]: any = useState();
  const [howManyNumbers, setHowManyNumbers]: any = useState(0);
  const [complexity, setComplexity] = useState(6);
  const [howMuchTime, setHowMuchTime] = useState(500);
  const [trigger, setTrigger] = useState(false);
  const [activeSet, setActiveSet] = useState();
  const [activeSetNumber, setActiveSetNumber] = useState(0);
  const [setsOfNumbers, setSetsOfNumbers] = useState();
  const [numbers, setNumbers] = useState([]);
  const [actualNumber, setActualNumber] = useState("");
  const [sum, setSum]: any = useState(1);
  const [finish, setFinish] = useState(false);
  const [answer, setAnswer]: any = useState();
  const [finishAnwer, setFinishAnswer] = useState(0);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [levelChoosed, setLevelChoosed] = useState(0);

  // From teacher
  const [setsFromTeacher, setSetsFromTeacher] = useState<any>([]);
  const [setsOfNumbersLength, setSetsOfNumbersLength] = useState();

  const counter: any = useRef();
  const result: any = useRef();

  //start counting
  const startCounting = () => {
    setTrigger(true);
    setFinish(false);
    // console.log(trigger);
    let i = 0;
    console.log(i);
    let suma: number = 0;
    // console.log(numbers);
    setTimeout(() => {
      const StartCounting = () => {
        counter.current.style.color = "white";
        // console.log(numbers[i]);
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
          // console.log("koniec");
        }
      };

      const counting = setInterval(StartCounting, howMuchTime);

      StartCounting();
    }, 2000);
  };

  useEffect(() => {
    console.log("fired!");
    const get = async () => {
      console.log("user" + LoggedUser);
      if (LoggedUser !== undefined) {
        if (activeSetNumber === 0) {
          let data = await fetch("/api/checkDataFromTeacher", {
            method: "GET",
          });

          console.log(activeSetNumber);
          const result = await data.json();
          console.log(result);
          console.log(activeSet);

          const filterNumbers = await result.msg.filter((set: any) => set.table_name === activeSet);
          console.log(filterNumbers);

          if (filterNumbers.length > 0) {
            // console.log(filterNumbers[0].numbers.length);
            // console.log(filterNumbers[0].numbers[activeSetNumber]);

            setNumbers(filterNumbers[0].numbers[activeSetNumber]);
            //full sets with names, owener
            setSetsOfNumbers(filterNumbers);
            //length of specific sets
            setHowManyNumbers(filterNumbers[0].numbers[0].length + 1);
            //length of all numbers in array
            setSetsOfNumbersLength(filterNumbers[0].numbers.length);
          }
          if (data.status === 200) {
            setSetsFromTeacher(result.msg);
          } else {
            // setSetsFromTeacher(SetsFromTeacherResults.msg);
          }
        }
        if (activeSetNumber !== 0) {
          startCounting();
        }
      }
    };
    get();
  }, [activeSet, activeSetNumber, LoggedUser]);

  console.log(numbers);

  return (
    <div className="relative w-screen h-screen bg-[url('/background.jpeg')] bg-cover bg-center">
      <div className="w-full mx-auto">
        <HeaderRandom />
      </div>
      <Counting
        startCounting={startCounting}
        actualNumber={actualNumber}
        setActualNumber={setActualNumber}
        trigger={trigger}
        setTrigger={setTrigger}
        finish={finish}
        setFinish={setFinish}
        howManyNumbers={howManyNumbers}
        setHowManyNumbers={setHowManyNumbers}
        levelChoosed={levelChoosed}
        setLevelChoosed={setLevelChoosed}
        numbers={numbers}
        setNumbers={setNumbers}
        howMuchTime={howMuchTime}
        setHowMuchTime={setHowMuchTime}
        sum={sum}
        setSum={setSum}
        activeSet={activeSet}
        setActiveSet={setActiveSet}
        setsOfNumbers={setsOfNumbers}
        setSetsOfNumbers={setSetsOfNumbers}
        activeSetNumber={activeSetNumber}
        setActiveSetNumber={setActiveSetNumber}
        counter={counter}
        result={result}
        setsOfNumbersLength={setsOfNumbersLength}
        setSetsOfNumbersLength={setSetsOfNumbersLength}
      />
      <Levels
        startCounting={startCounting}
        actualNumber={actualNumber}
        setActualNumber={setActualNumber}
        advanceSearch={advanceSearch}
        setAdvanceSearch={setAdvanceSearch}
        trigger={trigger}
        setTrigger={setTrigger}
        howMuchTime={howMuchTime}
        setHowMuchTime={setHowMuchTime}
        howManyNumbers={howManyNumbers}
        setHowManyNumbers={setHowManyNumbers}
        numbers={numbers}
        setNumbers={setNumbers}
        sum={sum}
        setSum={setSum}
        finish={finish}
        setFinish={setFinish}
        levelChoosed={levelChoosed}
        setLevelChoosed={setLevelChoosed}
        activeSet={activeSet}
        setActiveSet={setActiveSet}
        setsOfNumbers={setsOfNumbers}
        setSetsOfNumbers={setSetsOfNumbers}
        setsFromTeacher={setsFromTeacher}
        setSetsFromTeacher={setSetsFromTeacher}
        setsOfNumbersLength={setsOfNumbersLength}
        setSetsOfNumbersLength={setSetsOfNumbersLength}
        activeSetNumber={activeSetNumber}
        setActiveSetNumber={setActiveSetNumber}
      />
    </div>
  );
}

// export const getStaticProps = async () => {
//   //check if cookie existsgetCookie
//   let Cookie = await fetch("http://localhost:3000/api/getCookie", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let results;

//   let JsonCookie = await Cookie.json();

//   let Splited;
//   let name;
//   let session;

//   console.log("cookie" + JSON.stringify(JsonCookie));

//   // split values if cookie exists
//   if (JsonCookie.name?.length > 0) {
//     Splited = await JsonCookie.name.split("_");
//     name = await Splited[0];
//     session = await Splited[1];

//     let Registration = await fetch("http://localhost:3000/api/checkIfSessionExists", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         login: name,
//         session: session,
//       }),
//     });

//     const status = await Registration.status;
//     console.log("lalalallaaaaaa" + status);

//     if (status === 200) {
//       results = name;
//     } else {
//       results = "ther is no active session";
//     }
//   } else {
//     console.log("No coockie")
//   }

//   return {
//     props: { loggedUser: "lala" },
//   };
// };
