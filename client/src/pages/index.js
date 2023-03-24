import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Patient from "@/components/Patient";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

export default function Home() {
  const [data, setData] = useState(null);
  const [patientdata, setpatientdata] = useState(null);
  const [patient, setPatient] = useState("");
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    let fetchdata;
    if (router.isReady) {
      fetchdata = setTimeout(async () => {
        const response = await fetch(
          `https://patient-analysis.arasharora.repl.co/persons?search=${search}`
        );
        const data = await response.json();
        setData(data);
      }, 1200);
    }
    return () => clearTimeout(fetchdata);
  }, [search]);

  const patientData = async (user_id) => {
    try {
      const resp = await fetch(
        `https://patient-analysis.arasharora.repl.co/illness/?user_id=${user_id}`
      );
      const data = await resp.json();
      setpatientdata(data);
      setPatient("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Patient Data Analysis</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="max-w-7xl px-20 mx-auto min-h-screen flex justify-center items-baseline">
        <section className="my-[120px]">
          <h1 className="text-center text-5xl font-bold">
            Select the patient to see details
          </h1>
          {data ? (
            <>
              <div className="w-[300px] mx-auto">
                <label className="mt-12 block mb-1">Type patient-{"<%>"}</label>
                <input
                  placeholder="Patient-"
                  className="mx-auto block px-4 py-2 w-full border-2 border-gray-400 rounded-lg"
                  value={patient}
                  onChange={(e) => {
                    setPatient(e.target.value);
                    setSearch(e.target.value);
                  }}
                ></input>

                <ul
                  className={`flex flex-col items-center w-full rounded-lg bg-gray-100 py-2 ${
                    data.length > 5 ? "h-[150px]" : "h-auto"
                  } overflow-y-auto ${patient ? "" : "hidden"}`}
                >
                  {data ? (
                    data.map((d, v) => {
                      return (
                        <li
                          key={v}
                          onClick={(e) => setPatient(d.index2)}
                          className="cursor-pointer block w-full text-center hover:bg-gray-300 transition-all border-b border-gray-200 last:border-0"
                        >
                          {d.index2}
                        </li>
                      );
                    })
                  ) : (
                    <li>No data</li>
                  )}
                </ul>
              </div>
              <button
                onClick={() => {
                  patientData(patient);
                  setPatient("");
                }}
                className="my-4 mx-auto block border-2 border-gray-400 rounded-lg hover:bg-black hover:text-white hover:border-transparent px-4 py-2"
              >
                Submit
              </button>
            </>
          ) : (
            <Loader />
          )}

          {patientdata && <Patient patientdata={patientdata} />}
        </section>
      </main>
    </>
  );
}
