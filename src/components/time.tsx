import React from "react";
import { useRef } from "react";

interface QueryParams {
  howMuchTime: any;
  setHowMuchTime: React.Dispatch<React.SetStateAction<any>>;
}

export default function Time({ howMuchTime, setHowMuchTime }: QueryParams) {
  const halfSecond: any = useRef();
  const oneSecond: any = useRef();
  const twoSeconds: any = useRef();
  const threeSeconds: any = useRef();
  const fourSeconds: any = useRef();
  const fiveSeconds: any = useRef();

  const handleTimeValue = (e: any) => {
    setHowMuchTime(parseInt(e.target.getAttribute("data-value")));
  };

  return (
    <div className="flex flex-col">
      <div className="mb-[5px] text-[16px]">
        Czas wyświetlania liczby (sekundy):
      </div>
      <div className="flex w-full justify-between flex-wrap">
        <div
          ref={halfSecond}
          className={
            howMuchTime === 500
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          data-value="500"
          onClick={handleTimeValue}
        >
          0,5
        </div>
        <div
          ref={oneSecond}
          data-value="1000"
          className={
            howMuchTime === 1000
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6]  rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          1
        </div>
        <div
          ref={twoSeconds}
          data-value="2000"
          className={
            howMuchTime === 2000
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          2
        </div>
        <div
          ref={threeSeconds}
          data-value="3000"
          className={
            howMuchTime === 3000
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          3
        </div>
        <div
          ref={fourSeconds}
          data-value="4000"
          className={
            howMuchTime === 4000
              ? "px-[15px] py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "px-[15px] py-[2px] bg-[#4DE7EA]  rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          4
        </div>
        <div
          ref={fiveSeconds}
          data-value="5000"
          className={
            howMuchTime === 5000
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#4DE7EA] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleTimeValue}
        >
          5
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
