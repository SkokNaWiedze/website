import Image from "next/image";
import Header from "@/components/header";
import Numbers from "@/components/numbers";
import Time from "@/components/time";
import { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";
import Complexity from "@/components/complexity";
import Start from "@/components/start";
import Levels from "@/components/levels";
import NumbersStarter from "../components/lvlstarter";
import Advancesearch from "@/components/advancesearch";
import Counting from "@/components/counting";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, setState]: any = useState();
  const [howManyNumbers, setHowManyNumbers]: any = useState(0);
  const [complexity, setComplexity] = useState(6);
  const [howMuchTime, setHowMuchTime] = useState(500);
  const [trigger, setTrigger] = useState(false);
  const [numbers, setNumbers] = useState([]);
  const [actualNumber, setActualNumber] = useState("");
  const [sum, setSum]: any = useState(1);
  const [finish, setFinish] = useState(false);
  const [answer, setAnswer]: any = useState();
  const [finishAnwer, setFinishAnswer] = useState(0);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [levelChoosed, setLevelChoosed] = useState(0);

  let showedNumber;

  const num = numbers.map((i) => (
    <div key={i} className="px-[10px]">
      {i}
    </div>
  ));

  let nums;

  return (
    <div className="relative w-screen">
      <Counting
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
      />
      <Levels
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
      />
    </div>
  );
}
