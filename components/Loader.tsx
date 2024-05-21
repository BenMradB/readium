import React from "react";
import { HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="h-screen bg-input/50 absolute  top-0 left-0 bottom-0 w-full h-full flex items-center   justify-center z-10">
      <HashLoader color="#000000" size={100} />
    </div>
  );
};

export default Loader;
