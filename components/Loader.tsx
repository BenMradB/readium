import React from "react";
import { Loader2 } from "lucide-react";
const Loader = () => {
  return (
    <div className="absolute top-0 left-0 bottom-0 w-full h-full flex items-center justify-center  blur-sm z-10">
      {/* <BoxesLoader
        boxColor={"#000000"}
        style={{ marginBottom: "20px" }}
        desktopSize={"128px"}
        mobileSize={"80px"}
      /> */}
      <Loader2 size={128} />
    </div>
  );
};

export default Loader;
