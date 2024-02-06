import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

interface Props {
  sets: any;
  owner: any;
  dataFromDB: any;
  newTable: any;
  setIsDataLoaded: any;
}

export default function AddNewSet({ setIsDataLoaded, sets, owner, dataFromDB, newTable }: Props) {
  const [name, setName] = useState<any>(null);
  const [isNameFree, setIsNameFree] = useState<any>(false);

  const router = useRouter();

  const checkingLogin: any = useRef();
  const addTableButton: any = useRef();
  const badName: any = useRef();
  const startTyping: any = useRef();

  const checkIfTableNameExists = async (e: any) => {
    setIsNameFree(false);
    // addTableButton.current.style.display = "none";
    addTableButton.current.disabled = true;
    addTableButton.current.style.backgroundColor = "lightgray";
    badName.current.style.display = "none";
    setName(e.target.value);
    const query = JSON.stringify({
      table_name: e.target.value,
    });
    let data = await fetch("/api/checkIfTableExists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    const result = await data;
    if (result.status === 200 && name?.length > 3) {
      // setIsNameFree(true);
      addTableButton.current.style.display = "block";
      addTableButton.current.style.backgroundColor = "green";
      addTableButton.current.disabled = false;
    } else if (result.status === 400) {
      // setIsNameFree(false);
      badName.current.style.display = "block";
    }

    console.log(result.status);
  };

  const addingNewSets = async (e: any) => {
    setIsDataLoaded(false);
    // e.preventDefault();
    // router.push("/account", undefined, { scroll: false });
    // loader.current.style.display = "flex";
    const query = JSON.stringify({
      owner: owner,
      table_name: name,
      numbers: [],
      shared: [],
      isActive: false,
    });

    newTable(name);
    console.log("new Table added");

    let data = await fetch("/api/addNewTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: query,
    });

    console.log(await data.json());
    sets.current.style.display = "none";
    setName("");
  };

  console.log(name?.length);

  return (
    <div>
      <div className="w-[400px] h-[200px] border bg-white flex items-center justify-center rounded-[10px]">
        <form className="flex flex-col items-center justify-center" onSubmit={addingNewSets}>
          <div className="mb-[10px] text-[24px] font-bold">
            <p>Dodawanie zestawu</p>
          </div>
          <input
            className="w-[250px] border border-gray-800 px-[3px] h-[40px]"
            placeholder="Unikatowa nazwa zestawu"
            onChange={checkIfTableNameExists}
            value={name}
          ></input>
          <div className="h-[50px] flex flex-col items-center justify-end">
            {/* <div ref={checkingLogin}>loader</div> */}
            <div className="h-[50px]">
              <div
                ref={badName}
                className="hidden text-red-500 px-[7px] rounded-[5px] text-center text-[12px]"
              >
                Taka nazwa zestawu już istnieje w bazie. Nie możesz Jej dodać.
              </div>
            </div>
            <button
              disabled={true}
              ref={addTableButton}
              className=" bg-gray-300 px-[7px] text-white rounded-[5px]"
            >
              Dodaj zestaw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
