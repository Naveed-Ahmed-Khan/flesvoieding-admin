import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../api/firebase-config";
import useApp from "../../hooks/useApp";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllAppsItems = ({ appName, icon, appId, isFeatured }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [featured, setFeatured] = useState(false);

  const { deleteApp, featureApp } = useApp();

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-4 lg:col-span-7 flex gap-4 place-self-start text-left font-semibold text-primary">
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
            <p>{appName}</p>
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
          {isFeatured ? (
            <Button disabled={true}>Feature</Button>
          ) : (
            <Button
              onClick={() => {
                setFeatured(true);
                setShowFeatureModal(true);
              }}
            >
              Feature
            </Button>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-app/${appId}`);
            }}
          >
            Edit
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
        title="Remove!"
        show={showDeleteModal}
        onClick={() => setShowDeleteModal(false)}
      >
        Are you sure you want to remove this App?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              deleteApp(appId);
              setShowDeleteModal(false);
            }}
          >
            OK
          </Button>
        </div>
      </Backdrop>
      <Backdrop
        title="Feature App!"
        show={showFeatureModal}
        onClick={() => setShowFeatureModal(false)}
      >
        Are you sure you want to Feature this App?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              featureApp(appId, featured);
              setShowFeatureModal(false);
            }}
          >
            OK
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllAppsItems;
