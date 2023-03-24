import React, { useEffect, useState } from "react";
import List from "./List";

function Patient({ patientdata }) {
  const [type, setType] = useState("Symptom");
  const [page, setPage] = useState(12);
  const data = patientdata.filter((p) => {
    if (p.trackable_name == "Food") {
      return false;
    }
    if (p.trackable_name == "Tag") {
      return false;
    }
    return true;
  });

  return (
    <div className="text-center">
      {patientdata.length > 0 ? (
        <>
          <h1 className="font-semibold text-2xl capitalize">
            {patientdata[0].index2}
          </h1>
          <p className="text-gray-500 mt-2">
            Lives in {patientdata[0].country}
          </p>
          <p className="text-gray-900 mt-2">{patientdata[0].age} years age</p>
          <h3 className="text-4xl inline-block text-black font-semibold my-5">
            Trackable Name
          </h3>

          <div className="flex gap-10 h-[300px] overflow-y-auto overflow-x-hidden ">
            <List
              title={"Symptoms"}
              patientdata={patientdata}
              type="Symptom"
              page={page}
            />
            <List
              title={"Treatments"}
              patientdata={patientdata}
              type="Treatment"
              page={page}
            />
            <List
              title={"Tags"}
              patientdata={patientdata}
              type="Tag"
              page={page}
            />
            <List
              title={"Conditions"}
              patientdata={patientdata}
              type="Condition"
              page={page}
            />
            <List
              title={"Weather"}
              patientdata={patientdata}
              type="Weather"
              page={page}
            />
            <List
              title={"Food"}
              patientdata={patientdata}
              type="Food"
              page={page}
            />
          </div>
          <button
            onClick={() => {
              if (page == 12) {
                setPage(patientdata.length);
              } else {
                setPage(12);
              }
            }}
            disabled={patientdata.length < 5 ? true : false}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg disabled:bg-blue-100"
          >
            {page == 12 ? "View More" : "View Less"}
          </button>
          <div className="border-t mt-5">
            <ul className="flex justify-between">
              <li
                className={`${
                  type == "Symptom" ? "text-black" : "text-gray-600"
                } text-2xl my-4 hover:text-black cursor-pointer`}
                onClick={() => setType("Symptom")}
              >
                Symptoms
              </li>
              <li
                className={`${
                  type == "Treatment" ? "text-black" : "text-gray-600"
                } text-2xl my-4 hover:text-black cursor-pointer`}
                onClick={() => setType("Treatment")}
              >
                Treatments
              </li>
              <li
                className={`${
                  type == "Condition" ? "text-black" : "text-gray-600"
                } text-2xl my-4 hover:text-black cursor-pointer`}
                onClick={() => setType("Condition")}
              >
                Conditions
              </li>
              <li
                className={`${
                  type == "Tag" ? "text-black" : "text-gray-600"
                } text-2xl my-4 hover:text-black cursor-pointer`}
                onClick={() => setType("Tag")}
              >
                Tags
              </li>
              <li
                className={`${
                  type == "Weather" ? "text-black" : "text-gray-600"
                } text-2xl my-4 hover:text-black cursor-pointer`}
                onClick={() => setType("Weather")}
              >
                Weather
              </li>
            </ul>
            {patientdata.map((p, id) => {
              // console.log(p);
              return (
                <div key={id}>
                  {p.trackable_type == type && (
                    <div className="text-center border-b p-5">
                      <span className="text-lg font-semibold">
                        {p.trackable_type}
                      </span>
                      :{" "}
                      <a
                        href={p.trackable_name}
                        className="text-lg hover:text-indigo-600"
                      >
                        {p.trackable_name}
                      </a>
                      <p>Check Date: {p.checkin_date}</p>
                      <p>Trackable Value: {p.trackable_value}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className="text-2xl">Sorry No data available</p>
      )}
    </div>
  );
}

export default Patient;
