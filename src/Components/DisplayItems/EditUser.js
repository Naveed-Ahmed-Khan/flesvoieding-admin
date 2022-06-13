import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import useUser from "../../hooks/useUser";
import userService from "../../api/videos.api";

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const { docData: selectedUser, isloading } = useFetchDoc(
    `/get-user/${userId}`
  );

  console.log(selectedUser);

  const { updateUser, uploadUserImage, imagePath } = useUser();
  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: selectedUser?.userName,
      email: selectedUser?.email,
      contact: selectedUser?.contact,
      address: selectedUser?.address,
      profilePic: selectedUser?.profilePic,
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log(values);
      await userService.updateUser(userId, values);
      navigate("/dashboard/users");
      // updateUser(values, userId, imagePath);
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit User</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {formik.values.profilePic ? (
                <img
                  src={formik.values.profilePic}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
              {/* <InputFile
                name="imagePath"
                imageName={profilePic?.name}
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
                onUpload={() => {
                  uploadUserImage(profilePic, userId);
                }}
              >
                Upload
              </InputFile> */}
            </div>
            <Input
              width="full"
              type="text"
              name="userName"
              label="Name:"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <Input
              width="full"
              type="text"
              label="E-mail:"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              width="full"
              type="text"
              label="Contact:"
              name="contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
            />
            <Input
              width="full"
              type="text"
              label="Address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {/* <TextArea
            rows={1}
            type="text"
            label="Address:"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          /> */}
          </section>

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
                navigate("/dashboard/users");
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
            Are you sure you want to update user details?
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

export default EditUser;
