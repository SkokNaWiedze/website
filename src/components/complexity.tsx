import React from "react";
import { useRef } from "react";

interface QueryParams {
  complexity: any;
  setComplexity: React.Dispatch<React.SetStateAction<any>>;
}

export default function Complexity({ complexity, setComplexity }: QueryParams) {
  const halfSecond: any = useRef();
  const oneSecond: any = useRef();
  const twoSeconds: any = useRef();
  const threeSeconds: any = useRef();
  const fourSeconds: any = useRef();
  const fiveSeconds: any = useRef();

  const handleTimeValue = (e: any) => {
    setComplexity(parseInt(e.target.getAttribute("data-value")));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-[5px] text-[16px]">Ilość cyfr w liczbie:</div>
      <div className="flex w-[150px] justify-between mb-[30px]">
        <div
          ref={halfSecond}
          className={
            complexity === 1
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          data-value="1"
          onClick={handleTimeValue}
        >
          1
        </div>
        <div
          ref={oneSecond}
          data-value="2"
          className={
            complexity === 2
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          2
        </div>
        <div
          ref={twoSeconds}
          data-value="3"
          className={
            complexity === 3
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          3
        </div>
        {/* <div
          //   onClick={handleTrigger}
          className="border ml-[10px] px-[10px] w-[100px] text-center bg-green-400 cursor-pointer"
        >
          Start
        </div> */}
      </div>
    </div>
  );
}
