import React from "react";
import { useRef } from "react";

interface QueryParams {
  howManyNumbers: any;
  setHowManyNumbers: React.Dispatch<React.SetStateAction<any>>;
}

export default function Numbers({
  howManyNumbers,
  setHowManyNumbers,
}: QueryParams) {
  const sixNumbers: any = useRef();
  const eightNumbers: any = useRef();
  const twelveNumbers: any = useRef();

  const handleSettingValue = (e: any) => {
    setHowManyNumbers(parseInt(e.target.getAttribute("data-value")));
  };

  return (
    <div className="flex flex-col mb-[30px]">
      <div className="mb-[5px] text-[16px]">Ilość liczb:</div>
      <div className="flex w-[150px] justify-between">
        <div
          ref={sixNumbers}
          className={
            howManyNumbers === 6
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          data-value="6"
          onClick={handleSettingValue}
        >
          6
        </div>
        <div
          ref={eightNumbers}
          data-value="8"
          className={
            howManyNumbers === 8
              ? "py-[2px] bg-[#7856B8] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleSettingValue}
        >
          8
        </div>
        <div
          ref={twelveNumbers}
          data-value="12"
          className={
            howManyNumbers === 12
              ? "py-[2px] bg-[#7856B8]  rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center text-white"
              : "py-[2px] bg-[#49DEE6] rounded-[5px] shadow-sm cursor-pointer text-[20px] w-[40px] text-center"
          }
          onClick={handleSettingValue}
        >
          12
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
