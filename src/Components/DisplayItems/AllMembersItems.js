import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/videos.api";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllMembersItems = ({ groupMember, group, setGroup }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {groupMember?.profilePic ? (
              <img
                src={groupMember?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{groupMember?.userName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">{"5:12 pm"}</p>
              <p className=" text-[#404852] self-end">.</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {"Details"}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              // navigate(`/dashboard/edit-groupMember/${groupMember._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            type={"button"}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Remove
          </Button>
        </div>
      </div>
      <Backdrop
        title="Remove User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the group member?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              let newGroup = group?.filter(
                (member) => !(groupMember._id === member._id)
              );
              setGroup(newGroup);
              console.log(newGroup);
              // await userService.deleteUser(groupMember._id);
              // setCheck(!check);
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

export default AllMembersItems;
