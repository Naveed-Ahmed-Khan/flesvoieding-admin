import React from "react";

const AllTutorsItems = (props) => {
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-6 flex gap-4 place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            <img
              src={props.imgSrc}
              alt=""
              className="object-cover h-12  rounded-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p>{props.tutor}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
              <p className=" text-[#404852] self-end">.</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {"Details"}
              </p>
            </div>
          </div>
        </div>
        <button
          className="col-span-2 text-red-500 text-sm py-[6px] px-[12px] rounded-md border border-red-500"
          onClick={() => {
            alert("Tutor Blacklisted!");
          }}
        >
          Blacklist
        </button>
        <button className="col-span-2  bg-primary text-white text-sm py-[6px] px-[12px] rounded-md">
          Add Details
        </button>
        <button className="col-span-1 bg-primary text-white text-sm py-[6px] px-[12px] rounded-md">
          Edit
        </button>
        <button className="col-span-1 bg-primary text-white text-sm py-[6px] px-[12px] rounded-md">
          Delete
        </button>
      </div>
    </>
  );
};

export default AllTutorsItems;
