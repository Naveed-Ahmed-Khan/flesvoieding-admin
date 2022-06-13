import React, { useEffect, useState } from "react";

import Input from "../UI/Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import AllMembersItems from "./AllMembersItems";
import useFetchDoc from "../../hooks/useFetchDoc";
import useFetch from "../../hooks/useFetch";
import groupService from "../../api/groups.api";

const EditGroup = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const { docData: selectedGroup, isloading } = useFetchDoc(
    `/get-group/${groupId}`
  );
  const { data: users } = useFetch(`/get-users`, true);

  // console.log(users);

  useEffect(() => {
    setGroup(selectedGroup?.groupMembers);
  }, [selectedGroup?.groupMembers]);

  console.log(group);
  const formik = useFormik({
    initialValues: {
      groupName: selectedGroup?.groupName,
      groupMembers: group,
      memberEmail: "",
      // addDepositingPeriod: selectedGroup?.addDepositingPeriod,
      // groupAdmin: selectedGroup?.groupAdmin,
      // maxPeople: selectedGroup?.maxPeople,
      // date: selectedGroup?.date,
      // time: selectedGroup?.time,
      // totalAmount: selectedGroup?.totalAmount,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await groupService.updateGroup(groupId, {
        groupName: values.groupName,
        groupMembers: group,
      });
      navigate("/dashboard/groups");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-4 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Group</h1>

          <div
            className={`flex flex-col gap-6 ransition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <Input
              type="text"
              name="groupName"
              label="Group:"
              onChange={formik.handleChange}
              value={formik.values.groupName}
            />
            <Input
              type="text"
              name="memberEmail"
              label="Group Member (e-mail)"
              onChange={formik.handleChange}
              value={formik.values.memberEmail}
            />

            {/* <Input
              disabled
              type="text"
              name="groupAdmin"
              label="Admin:"
              onChange={formik.handleChange}
              value={formik.values.groupAdmin}
            /> */}
            {/* <Input
              disabled
              type="text"
              label="Created At:"
              name="date"
              onChange={formik.handleChange}
              value={formik.values.date}
            /> */}
            <div className="shadow-sm ">
              <h2 className="flex items-center justify-between mb-3">
                <p className="text-secondary text-xl font-semibold">
                  All Group Members
                </p>
                <Button
                  type={"button"}
                  onClick={() => {
                    setIsMember(false);

                    let preMember = group.filter(
                      (member) => member.email === formik.values.memberEmail
                    );
                    console.log(preMember.length);
                    if (preMember.length === 0) {
                      let filteredUser = users.filter(
                        (user) => user.email === formik.values.memberEmail
                      );
                      setGroup([...group, filteredUser[0]]);
                      console.log(group);
                    } else {
                      setIsMember(true);
                    }
                  }}
                >
                  <div className="text-base p-1">Add User</div>
                </Button>
              </h2>

              <div
                className="flex flex-col gap-3 h-[45vh] pl-2 py-2 rounded border border-gray-500
                lg:pl-4 lg:py-4
                md:overflow-y-auto md:min-w-max scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300 "
              >
                {group &&
                  group?.map((member) => (
                    <AllMembersItems
                      key={member._id}
                      groupMember={member}
                      group={group}
                      setGroup={setGroup}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                // console.log(group.members);
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/groups");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>

          <Backdrop
            title="Duplicate"
            show={isMember}
            onClick={() => setIsMember(false)}
          >
            Cannot add the same member twice !
            <div className="self-end">
              <Button type={"button"} onClick={() => setIsMember(false)}>
                OK
              </Button>
            </div>
          </Backdrop>

          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update group details?
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

export default EditGroup;
