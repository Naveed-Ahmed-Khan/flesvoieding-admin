import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Backdrop = ({ show, onClick, title, children }) => {
  const [isfadeoutDelay, setIsFadeoutDelay] = useState(false);

  const DURATION = 300; /* 75, 100, 150, 200, 300, 500, 700, 1000 */
  const TRANSITION = "ease-out"; /*ease-in, ease-out, ease-in-out, linear */

  useEffect(() => {
    if (show === false) {
      setTimeout(() => {
        setIsFadeoutDelay(true);
      }, DURATION);
    } else {
      setIsFadeoutDelay(false);
    }
  }, [show]);

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 right-0 left-0 w-screen h-screen bg-black 
        transition-opacity dura duration-${DURATION} ${TRANSITION}
        ${show === true ? "opacity-80" : "opacity-0"}
        ${isfadeoutDelay === true ? "-z-50" : "z-40"}
        `}
        onClick={onClick}
      />
      <main
        className={`flex flex-col gap-2 fixed p-6 bg-gray-200 shadow-lg drop-shadow-xl rounded-md
        top-[35%] left-[10%] w-[80%] 
        sm:w-[50%] sm:left-[25%] 
        lg:w-[40%] lg:left-[30%]
        transition duration-${DURATION} ${TRANSITION}
        ${
          show === true
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0"
        }
        ${isfadeoutDelay === true ? "-z-40" : "z-40"}
        `}
      >
        <h2 className="text-xl font-semibold text-secondary"> {title}</h2>
        <div className="flex flex-col text-black opacity-90">{children}</div>
      </main>
    </>
  );
};

export default Backdrop;
