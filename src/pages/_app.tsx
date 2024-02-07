import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AppContext } from "@/context";
import { getStaticProps } from "next/dist/build/templates/pages";

export default function App({ Component, pageProps }: AppProps) {
  const [LoggedUser, setLoggedUser] = useState("");

  const getLoggingData = async () => {
    //check if cookie existsgetCookie
    let Cookie = await fetch("/api/getCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let JsonCookie = await Cookie.json();

    // console.log("LALALA " + JsonCookie);

    // split values if cookie exists
    if (JsonCookie.name?.length > 0) {
      const Splited = await JsonCookie.name.split("_");
      const name = await Splited[0];
      const session = await Splited[1];

      let Registration = await fetch("/api/getDataMiddleware", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: name,
          session: session,
        }),
      });

      const status = await Registration.status;

      if (status === 200) {
        setLoggedUser(name);
      } else {
        setLoggedUser("");
      }
    }
  };

  if (LoggedUser === "") {
    getLoggingData();
  }

  console.log(LoggedUser);

  return (
    <AppContext.Provider value={{ LoggedUser, setLoggedUser }}>
      <Component onLoad={getLoggingData} {...pageProps} />
    </AppContext.Provider>
  );
}
