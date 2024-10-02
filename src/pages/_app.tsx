import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AppContext } from "@/context";
import { getStaticProps } from "next/dist/build/templates/pages";

export default function App({ Component, pageProps }: AppProps) {
  const [LoggedUser, setLoggedUser] = useState<any>();
  const [userType, setUserType] = useState<any>();

  const getLoggingData = async () => {
    //check if cookie existsgetCookie
    let Cookie = await fetch("/api/getCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let JsonCookie = await Cookie.json();

    // split values if cookie exists
    if (JsonCookie.name?.length > 0) {
      const Splited = await JsonCookie.name.split("_");
      const name = await Splited[0];
      const secondPartSplited = await Splited[1].split("*");
      const session = await secondPartSplited[0];

      let Registration = await fetch("/api/checkIfSessionExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: name,
          session: session,
        }),
      });

      const ReturnedData = await Registration.json();
      const status = await Registration.status;
      const accountType = await ReturnedData.result;
      console.log("ACOUNT TYPE" + accountType);

      if (status === 200) {
        setLoggedUser(name);
        setUserType(accountType);
      } else {
        setLoggedUser(undefined);
        setUserType(undefined);
      }
    }
  };

  useEffect(() => {
    getLoggingData();
  });

  return (
    <AppContext.Provider value={{ LoggedUser, setLoggedUser, userType, setUserType }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
