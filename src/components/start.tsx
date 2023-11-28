import React from "react";

interface QueryParams {
  trigger: any;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  handleTrigger: any;
}

export default function Start({ handleTrigger }: QueryParams) {
  return (
    <div
      onClick={handleTrigger}
      className="cursor-pointer duration-200 text-center text-[40px] h-auto w-[240px] bg-[#6AC925] rounded-[35px] my-[30px] mx-auto text-white cursor border-2 border-[#6AC925] hover:bg-white hover:text-orange-400 hover:border-orange-400"
    >
      Start
    </div>
  );
}
