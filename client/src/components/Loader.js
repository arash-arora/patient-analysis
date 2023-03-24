import React from "react";
import { BallTriangle } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center my-32">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgb(248 113 113)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
