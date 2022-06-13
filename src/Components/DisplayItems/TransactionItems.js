import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const TransactionItems = ({
  transactionId,
  groups,
  amount,
  members,
  startingDate,
  from,
  to,
  onEdit,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="grid grid-cols-5 auto-rows-auto place-items-center text-center ">
        <div className="col-span-1 text-primary ">{from}</div>
        <div className="col-span-1 text-primary">${amount}</div>
        <div className="col-span-1 text-primary flex flex-col">
          {to}
          {/* <p>
            From: <span>{from}</span>
          </p>
          <p>
            To: <span>{to}</span>
          </p> */}
        </div>
        <div className="col-span-1 text-primary">{startingDate}</div>
        <div className="col-span-1 ">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-transaction/${transactionId}`);
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransactionItems;
