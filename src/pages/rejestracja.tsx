import React, { useState } from "react";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";
import RegisterStudent from "@/components/registerStudent";

export default function Registration() {
  return (
    <div className="bg-[#7856B8]/[0.4] flex items-center justify-center w-screen h-screen">
      <RegisterStudent />
    </div>
  );
}
