import React from "react";

const FeedbackItems = (props) => {
  return (
    <>
      <div className="grid grid-cols-5 place-items-center gap-x-6 gap-y-8 text-center">
        <div className="col-span-1 text-primary">{props.studentName}</div>
        <div className="col-span-1 text-primary">{props.tutor}</div>
        <div className="col-span-1 text-primary">{props.institutes}</div>
        <button className="col-span-1 bg-primary text-white text-sm py-[6px] px-[12px] rounded-md">
          View
        </button>
        <button className="col-span-1 bg-primary text-white text-sm py-[6px] px-[12px] rounded-md">
          View
        </button>
      </div>
    </>
  );
};

export default FeedbackItems;
