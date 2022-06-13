import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../api/firebase-config";
import Card from "../Components/UI/Card";
import TransactionItems from "../Components/DisplayItems/TransactionItems";
import JobsDetailsItems from "../Components/DisplayItems/TransactionItems";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import Spinner from "../Components/UI/Spinner";

const JobsDetailsList = [
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    actions: "Remove Tutor",
  },
  {
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    actions: "Remove Tutor",
  },
  {
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    actions: "Remove Tutor",
  },
  {
    tutor: "Sajad Ullah",
    pendingFee: "20000",
    studentName: "Tauseeq Babar",
    institutes: "Asif Public School",
    actions: "Remove Tutor",
  },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const transactionsCollectionRef = collection(db, "transactions");
  // console.log(transactionsCollectionRef);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await getDocs(transactionsCollectionRef);
      setTransactions(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setIsloading(false);
    };
    getTransactions();
  }, [transactionsCollectionRef]);

  const date = new Date();
  const currentDate = `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`;
  return (
    <>
      <Backdrop
        title="Edit"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to edit?
        <div className="self-end">
          <Button onClick={() => setShowModal(false)}>OK</Button>
        </div>
      </Backdrop>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <header className="flex flex-col gap-2 justify-start mb-14 ">
            <h1 className="text-4xl">Transactions</h1>
            <p className="text-gray-400">{currentDate}</p>
          </header>
          {/* Table */}
          {/* Header */}
          <div className="flex flex-col px-0 ">
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-secondary">Transactions</p>
            </div>
            <hr className="max-w-full" />
            {/* Body */}
            <div className="flex flex-col gap-5 mt-4 md:max-h-[55vh] xl:max-h-[55vh]">
              <header className="grid grid-cols-5 place-items-center text-center ">
                <p className="col-span-1 font-bold text-xl text-black">From</p>
                <p className="col-span-1 font-bold text-xl text-black">
                  Amount
                </p>
                <p className="col-span-1 font-bold text-xl text-black">To</p>
                <p className="col-span-1 font-bold text-xl text-black">Date</p>
                <p className="col-span-1 font-bold text-xl text-black">
                  Actions
                </p>
              </header>
              {isloading ? (
                <div className="m-auto mt-20">
                  <Spinner />
                </div>
              ) : (
                <div
                  className="flex flex-col gap-y-8 overflow-y-auto    
                scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300"
                >
                  {transactions.map((item) => {
                    return (
                      <TransactionItems
                        transactionId={item.id}
                        from={item.from}
                        amount={item.amount}
                        to={item.to}
                        startingDate={item.timeStamp.toDate().toUTCString()}
                        onEdit={() => setShowModal(true)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Transactions;
