import React from "react";
import Card from "../Components/UI/Card";

const Settings = () => {
  return (
    <Card>
      <div className="w-[90%] max-w-5xl h-full mx-auto">
        <h1 className="text-4xl ">Settings</h1>
        <form
          /* onSubmit={formik.handleSubmit} */
          className="flex flex-col flex-wrap gap-4 mt-6 md:mt-14 md:px-14 md:gap-10"
        >
          <div className="flex justify-between items-center">
            <label className="max-w-[40%]">
              <p className="text-primary text-lg font-semibold ">
                App Language:
              </p>
            </label>
            <select
              className="bg-gray-200  text-gray-500 rounded w-[100%] max-w-[70%] 
              border-gray-500 focus:ring-1 focus:ring-primary focus:border  focus:border-primary
              md:px-4 md:py-3"
              name="institute"
              id="institute"
              defaultValue="default"
              placeholder="Select Institute"
            >
              <option value="default">Select Language</option>
              <option value="english">English</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="max-w-[40%]">
              <p className="text-primary text-lg font-semibold ">Currency:</p>
            </label>
            <select
              className="bg-gray-200  text-gray-500 rounded w-[100%] max-w-[70%] 
              border-gray-500 focus:ring-1 focus:ring-primary focus:border focus:border-primary
              md:px-4 md:py-3"
              name="institute"
              id="institute"
              defaultValue="default"
              placeholder="Select Institute"
            >
              <option value="default">Select Currency</option>
              <option value="dollars">Dollars</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="max-w-[40%]">
              <p className="text-primary text-lg font-semibold ">
                Blocked Users:
              </p>
            </label>
            <select
              className="bg-gray-200  text-gray-500 rounded w-[100%] max-w-[70%] 
              border-gray-500 focus:ring-1 focus:ring-primary focus:border focus:border-primary
              md:px-4 md:py-3"
              name="institute"
              id="institute"
              defaultValue="default"
              placeholder="Select Institute"
            >
              <option value="default">Select Users</option>
              <option value="tom">Tom</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="max-w-[40%]">
              <p className="text-primary text-lg font-semibold ">
                Group Permisssion:
              </p>
            </label>
            <select
              className="bg-gray-200  text-gray-500 rounded w-[100%] max-w-[70%] 
              border-gray-500 focus:ring-1 focus:ring-primary focus:border focus:border-primary
                      md:px-4 md:py-3"
              name="institute"
              id="institute"
              defaultValue="default"
              placeholder="Select Institute"
            >
              <option value="default">Select Permission</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <label className="max-w-[40%]">
              <p className="text-primary text-lg font-semibold ">Allowed:</p>
            </label>
            <select
              className="bg-gray-200  text-gray-500 rounded w-[100%] max-w-[70%] 
              border-gray-500 focus:ring-1 focus:ring-primary focus:border focus:border-primary
                      md:px-4 md:py-3"
              name="institute"
              id="institute"
              defaultValue="default"
              placeholder="Select Institute"
            >
              <option value="default">Select</option>
              <option value="20">20</option>
            </select>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Settings;
