import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../api/videos.api";
import visaService from "../../api/visa.api";
import useUser from "../../hooks/useUser";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const VisaRequestsItems = ({ visa, check, setCheck }) => {
  // console.log(visa);

  let navigate = useNavigate();
  const { deleteUser } = useUser();

  const [isloading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {visa?.passportSizePhoto ? (
              <img
                src={visa?.passportSizePhoto}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{visa?.fullName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[14px]">{"Visa Type :"}</p>
              <p className="text-primary text-[14px] font-semibold opacity-70">
                {visa?.visaType}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-visaRequest/${visa._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
              // alert(userName + " with Id " + userId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the visa?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await visaService.deleteVisa(visa._id);
              setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default VisaRequestsItems;
