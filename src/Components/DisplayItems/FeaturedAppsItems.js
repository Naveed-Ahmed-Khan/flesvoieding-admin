import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import useApp from "../../hooks/useApp";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const FeaturedAppsItems = ({ icon, ftAppName, ftAppId, isFeatured }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [removefeatureApp, setremoveFeatureApp] = useState(true);

  const { deleteApp, featureApp } = useApp();

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-6 lg:col-span-8 flex gap-4 place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center">
            {icon ? (
              <img
                src={icon}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <p>{ftAppName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
              <p className=" text-[#404852] self-end">.</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {"Details"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-3 lg:col-span-2">
          <Button
            onClick={() => {
              setremoveFeatureApp(false);
              setShowFeatureModal(true);
            }}
          >
            Remove
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowDeleteModal(true);
              // alert(categoryName + " with Id " + categoryId + " deleted");
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete!"
        show={showDeleteModal}
        onClick={() => setShowDeleteModal(false)}
      >
        Are you sure you want to delete this App?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteApp(ftAppId);
              setShowDeleteModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
      <Backdrop
        title="Remove Featured App!"
        show={showFeatureModal}
        onClick={() => setShowFeatureModal(false)}
      >
        Are you sure you want to remove this App from "Featured" List?
        <div className="self-end mt-4 ">
          <Button
            type={"button"}
            onClick={() => {
              featureApp(ftAppId, removefeatureApp);
              setShowFeatureModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default FeaturedAppsItems;
