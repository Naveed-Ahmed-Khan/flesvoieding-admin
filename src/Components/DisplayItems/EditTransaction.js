import React, { useEffect, useState } from "react";

import Input from "../UI/Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../api/firebase-config";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState([]);
  const [name, setname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transactionsCollectionRef = collection(db, "transactions");

  useEffect(() => {
    const getTransactions = async () => {
      const data = await getDoc(doc(transactionsCollectionRef, transactionId));
      setTransaction(data.data());
    };
    getTransactions();
  }, [transactionId, transactionsCollectionRef]);

  const updateTransaction = async (values) => {
    const data = doc(transactionsCollectionRef, transactionId);
    await updateDoc(data, {
      from: values.senderName,
      to: values.recieverName,
      amount: values.amount,
    });
  };

  const formik = useFormik({
    initialValues: {
      senderName: transaction.from,
      recieverName: transaction.to,
      amount: transaction.amount,
      transactionDate: transaction.timeStamp?.toDate().toUTCString(),
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      updateTransaction(values);
      navigate("/dashboard/transactions");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Transaction</h1>

          {/*  <div className="flex items-center gap-6 mr-4">
            {formik.values.imagePath ? (
              <img
                src={formik.values.imagePath}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
            <input type="file" name="imagePath" />
          </div> */}
          <Input
            width="full"
            type="text"
            label="Sender:"
            name="senderName"
            onChange={formik.handleChange}
            value={formik.values.senderName}
          />
          <Input
            width="full"
            type="text"
            label="Reciever:"
            name="recieverName"
            onChange={formik.handleChange}
            value={formik.values.recieverName}
          />
          <Input
            width="full"
            type="text"
            label="Amount:"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
          <Input
            disabled
            width="full"
            type="text"
            label="Transaction Date:"
            name="transactionDate"
            onChange={formik.handleChange}
            value={formik.values.transactionDate}
          />

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/transactions");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>
          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update transaction details?
            <div className="self-end">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                OK
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditTransaction;
