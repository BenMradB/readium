import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full px-4 md:w-[90%] md:px-0 h-full mx-auto">
      {children}
    </div>
  );
};

export default Container;
