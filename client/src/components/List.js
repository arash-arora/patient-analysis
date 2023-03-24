import React from "react";

function List({ title, patientdata, type, page }) {
  return (
    <>
      <ul className="border-l border-t px-5 my-12 h-full">
        <h1 className="border-b py-2 text-xl font-semibold">{title}</h1>
        {patientdata.slice(0, page).map((p, id) => {
          return (
            <>
              {p.trackable_type == type && (
                <div key={id}>
                  <li className="py-1 capitalize border-b last:border-0">
                    <a
                      href={p.trackable_name}
                      className="text-lg hover:text-indigo-600"
                    >
                      {p.trackable_name}
                    </a>
                  </li>
                </div>
              )}
            </>
          );
        })}
      </ul>
    </>
  );
}

export default List;
