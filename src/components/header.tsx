import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="h-[120px] bg-white w-[1024px] mx-auto flex justify-center pt-[10px]">
      <Image src="/logo.jpeg" width={180} height={180} alt="logo" />
    </div>
  );
}
