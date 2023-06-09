import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default function country() {
  const [country, setCountry] = useState("FR");
  const [countryData, setCountryData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [page, setPage] = useState(51);
  useEffect(() => {
    const fetchCountryData = async () => {
      const resp = await fetch(
        `https://patient-analysis.arasharora.repl.co/country/?name=${country}&limit=${page}`
      );
      const data = await resp.json();
      console.log(data);
      setCountryData(data);
    };
    const allData = async () => {
      const response = await fetch(
        `https://patient-analysis.arasharora.repl.co/allcountries/?name=${country}`
      );
      const dat = await response.json();
      setAllData(dat);
    };
    fetchCountryData();
    allData();
  }, [country, page]);

  const handleClick = (name) => {
    setCountry(name);
    setPage(51);
    setAllData(null);
    setCountryData(null);
  };

  return (
    <>
      <Head>
        <title>Country Wise Analysis</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <nav className="bg-white py-6 border-t">
        <h1 className="text-4xl font-semibold text-center capitalize py-2">
          country wise analysis
        </h1>
        <h3 className="my-5 text-center">
          Total: {allData && allData[0].count}
        </h3>

        <ul className="flex gap-16 justify-center mt-5 pb-2">
          <li
            onClick={() => handleClick("US")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            US
          </li>
          <li
            onClick={() => handleClick("GB")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            GB
          </li>
          <li
            onClick={() => handleClick("CA")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            CA
          </li>
          <li
            onClick={() => handleClick("SE")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            SE
          </li>
          <li
            onClick={() => () => handleClick("FR")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            FR
          </li>
          <li
            onClick={() => handleClick("AU")}
            className="cursor-pointer text-xl hover:text-red-400 hover:border-b hover:border-red-400"
          >
            AU
          </li>
        </ul>
      </nav>
      <main className="max-w-7xl px-20 mx-auto text-center">
        {countryData ? (
          <div className="flex justify-center flex-col items-center my-12">
            <h1 className="font-semibold text-4xl">{country}</h1>
            <p className="mt-4 text-gray-400">
              Showing {countryData.length} results...
            </p>

            <div className="flex gap-2 justify-center items-center w-full">
              <button
                id="up"
                onClick={() => setPage(page + 51)}
                className="my-12 bg-blue-400 mx-auto text-white hover:bg-blue-500 px-12 py-2 rounded-lg"
              >
                View More
              </button>
            </div>
            <div className="flex flex-wrap gap-16 justify-between items-center my-20">
              {countryData.map((t, index) => {
                let url = `/patient/?patient=${t.index2}`;
                //url = decodeURIComponent(url.replace(/\+/g, "%20"));
                // url = encodeURIComponent(url);
                url = url.replace(/\+/g, "%2B");
                return (
                  <a
                    key={index}
                    href={url}
                    className="shadow-lg border shadow-[#222] py-4 px-4 min-w-96 mb-8 flex justify-center w-[300px] rounded-lg flex-col items-center hover:shadow-xl hover:shadow-[#222]"
                  >
                    <div className="py-4 px-4 min-w-96 mb-8 flex justify-center flex-col items-center rounded-lg w-[300px]">
                      <h1
                        className="px-4 my-2 font-bold uppercase"
                        key={t.user_id}
                      >
                        {t.index2}
                      </h1>
                      <p className="text-sm text-gray-500">Age: {t.age}</p>
                      <p className="text-sm text-gray-500">
                        Country: {t.country}
                      </p>
                      <h3 className="font-semibold mt-2">
                        Trackable Type: {t.trackable_type}
                      </h3>
                      <p>Trackable Name: {t.trackable_name}</p>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="flex gap-2 justify-center items-center w-full">
              <button
                id="last"
                onClick={() => setPage(page + 51)}
                className="my-12 bg-blue-400 mx-auto text-white hover:bg-blue-500 px-12 py-2 rounded-lg"
              >
                View More
              </button>
            </div>
            <a className="bottom-5 right-5 fixed" href="#">
              <img
                className="w-8 h-8"
                title="GO UP"
                src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
                alt=""
              />
            </a>
          </div>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}
