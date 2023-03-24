import Header from "@/components/Header";
import { CChart } from "@coreui/react-chartjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Name = () => {
  const router = useRouter();
  const [trackableData, setTrackableData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [page, setPage] = useState(51);

  let count = {};
  let sortable;

  if (allData) {
    allData.forEach((t) => {
      if (count[t.country]) {
        count[t.country] += 1;
      } else {
        count[t.country] = 1;
      }
    });

    count = Object.entries(count)
      .sort(([, a], [, b]) => b - a)
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  }

  useEffect(() => {
    const fetchName = async () => {
      if (router.isReady) {
        const { name } = router.query;
        const resp = await fetch(
          `https://patient-analysis.arasharora.repl.co/trackable/?name=${name}&limit=${page}`
        );
        const data = await resp.json();
        setTrackableData(data);
      }
    };
    fetchName();
  }, [router.isReady, page]);

  useEffect(() => {
    const fetchAllData = async () => {
      if (router.isReady) {
        const { name } = router.query;
        const resp = await fetch(
          `https://patient-analysis.arasharora.repl.co/stats/?name=${name}`
        );
        const data = await resp.json();
        setAllData(data);
      }
    };
    fetchAllData();
  }, [router.isReady]);
  return (
    <>
      <Head>
        <title>{allData ? allData[0].trackable_name : "Patient Data"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {allData && (
        <>
          <h1 className="text-4xl font-semibold mt-20 text-center capitalize">
            {allData[0].trackable_name}
          </h1>
          <h3 className="text-center my-5 text-xl">
            Total Patients suffering from {allData[0].trackable_name}:{" "}
            {allData.length}
          </h3>

          <p className="text-center text-gray-500">
            Percentage: {((allData.length / 42283) * 100).toFixed(2)}% of total
          </p>

          <CChart
            className="w-[200px] mx-auto mt-8"
            type="doughnut"
            data={{
              labels: [allData[0].trackable_name, "Others"],
              datasets: [
                {
                  backgroundColor: ["#41B883", "#E46651"],
                  data: [
                    Math.round((allData.length / 42283) * 100),
                    100 - Math.round((allData.length / 42283) * 100),
                  ],
                },
              ],
            }}
          />
          <hr className="my-5" />
          <CChart
            type="bar"
            className="w-[900px] mx-auto my-6"
            data={{
              labels: Object.keys(count).slice(0, 10),
              datasets: [
                {
                  label: "Number of occurences",
                  backgroundColor: "#f87979",
                  data: Object.values(count).slice(0, 10),
                },
              ],
            }}
            labels="Countries"
          />
        </>
      )}
      <main className="max-w-7xl px-20 mx-auto min-h-screen flex flex-wrap gap-16 justify-between items-center my-[60px]">
        {trackableData && trackableData.length >= 50 && (
          <div className="flex justify-center gap-8 items-center w-full">
            <button
              id="up"
              onClick={() => setPage(page + 51)}
              className="my-12 text-white bg-blue-400 mx-auto hover:bg-blue-500 px-12 py-2 rounded-lg"
            >
              View More
            </button>
            <a href="#last" className="flex justify-center items-center gap-2">
              <img
                title="Go down"
                src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
                alt=""
                className="w-8 h-8 rotate-180"
              />
            </a>
          </div>
        )}
        {trackableData &&
          trackableData.map((t, id) => {
            return (
              <div
                key={id}
                className="shadow-lg border shadow-[#222] py-4 px-4 min-w-96 mb-8 flex justify-center w-[300px] rounded-lg flex-col items-center hover:shadow-xl hover:shadow-[#222]"
              >
                <h1 className="px-4 my-2 font-bold uppercase" key={t.user_id}>
                  {t.index2}
                </h1>
                <p className="text-sm text-gray-500">Age: {t.age}</p>
                <p className="text-sm text-gray-500">Country: {t.country}</p>
                <h3 className="font-semibold mt-2">
                  Trackable Type: {t.trackable_type}
                </h3>
                <p>
                  Trackable Value: {t.trackable_value ? t.trackable_value : 0}
                </p>
                <button
                  onClick={() => {
                    router.push(`/patient/?patient=${t.index2}`);
                  }}
                  className="bg-blue-400 px-4 py-1 my-3 rounded-lg text-white hover:bg-blue-500"
                >
                  Know More
                </button>
              </div>
            );
          })}
        {trackableData && trackableData.length >= 50 && (
          <div className="flex justify-center gap-8 items-center w-full">
            <button
              id="last"
              onClick={() => setPage(page + 51)}
              className="my-12 text-white bg-blue-400 mx-auto hover:bg-blue-500 px-12 py-2 rounded-lg"
            >
              View More
            </button>
            <a href="#up" className="flex justify-center items-center gap-2">
              <img
                title="Go up"
                src="https://cdn-icons-png.flaticon.com/512/892/892692.png"
                alt=""
                className="w-8 h-8"
              />
            </a>
          </div>
        )}
      </main>
    </>
  );
};

export default Name;
