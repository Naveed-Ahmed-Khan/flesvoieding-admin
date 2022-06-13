import React from "react";
import Card from "../Components/UI/Card";
import Chart from "../Components/UI/Chart";

const tileContent = [
  { name: "Groups", number: 40 },
  { name: "Transactions", number: 360 },
  { name: "Users", number: 160 },
  { name: "Requests", number: 204 },
];

const Dashboard = () => {
  const date = new Date();
  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return (
    <Card>
      <div className="w-[90%] max-w-5xl h-full mx-auto">
        <header className="flex flex-col gap-2 justify-start md:min-h-max ">
          <h1 className="text-4xl">Overview</h1>
          <p className="text-gray-400">{currentDate}</p>
        </header>
        <main className="mt-8 flex flex-col gap-4">
          <section>
            <div className="grid grid-cols-4 gap-4">
              {tileContent.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-6 items-center py-10 lg:py-6 col-span-4 sm:col-span-2 lg:col-span-1 rounded-xl border-2 border-gray-500 text-center
                  hover:border-primary hover:ring-1 hover:ring-primary 
                  transition ease-out duration-300"
                >
                  <p className="text-2xl ">{item.name}</p>
                  <p className="text-2xl">{item.number}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div
              className="grid grid-cols-8 rounded-xl border-2 border-gray-500 hover:border-primary hover:ring-1 hover:ring-primary
                  transition ease-out duration-300"
            >
              <div className="p-6 lg:p-10 col-span-8 sm:col-span-8 md:col-span-6 lg:col-span-5">
                <p>Todays Trends</p>
                <p>60</p>
                <div className="h-60">
                  <Chart />
                </div>
              </div>
              <div
                className="p-6 lg:p-10 col-span-8 sm:col-span-8 md:col-span-2 lg:col-span-3 border-l-2 sm:border-t-2 sm:border-t-gray-500 md:border-l-gray-500 md:border-t-0 
              hover:border-l-primary hover:ring-1 hover:ring-primary
              transition ease-out duration-300 "
              >
                <p>Unresolved</p>
                <p>60</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Card>
  );
};

export default Dashboard;
