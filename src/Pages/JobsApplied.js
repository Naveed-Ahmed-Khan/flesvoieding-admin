import React from "react";
import Card from "../Components/Card";
import JobsAppliedItems from "../Components/DisplayItems/JobsAppliedItems";
import { jobsApplied } from "../Components/DummyData/jobs";
import Search from "../Components/Searchbar";

const JobsApplied = () => {
  const date = new Date();
  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return (
    <Card>
      <header className="flex flex-col gap-2 justify-start md:min-h-max ">
        <h1 className="text-4xl">Jobs Applied</h1>
        <p className="text-gray-400">{currentDate}</p>
        <div className="hidden md:block md:my-8 md:mx-auto md:max-w-1/2">
          <Search />
        </div>
      </header>
      {/* Table */}
      {/* Header */}
      <div className="flex-auto flex flex-col px-0 md:px-10">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-secondary">Jobs Applied</p>
          <svg
            className="fill-gray-400 object-contain h-10 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
          </svg>
        </div>
        <hr className="max-w-full" />
        {/* Body */}
        <div
          className="flex-auto flex flex-col gap-5 mt-4 md:max-h-[53vh] xl:max-h-[53vh] 
          md:overflow-y-auto scroll md:scroll-smooth    "
        >
          <header className="grid grid-cols-5 place-items-center gap-x-6">
            <p className="col-span-2 font-bold text-xl text-black">Jobs</p>
            <p className="col-span-1 font-bold text-xl text-black">
              Applicants
            </p>
            <p className="col-span-1 font-bold text-xl text-black">
              Institutes
            </p>
            <p className="col-span-1 font-bold text-xl text-black">Actions</p>
          </header>
          <div className=" flex flex-col gap-y-4">
            {jobsApplied.map((item, index) => {
              return (
                <JobsAppliedItems
                  mode={item.mode}
                  subject={item.subjects}
                  city={item.city}
                  country={item.country}
                  applicants={item.applicants}
                  institutes={item.institutes}
                  actions={item.actions}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobsApplied;
