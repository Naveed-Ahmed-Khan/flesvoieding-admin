import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import useApp from "../../hooks/useApp";

const EditApp = () => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const { docData: selectedApp, isloading } = useFetchDoc("apps", appId);
  const { updateApp, uploadappIcon, icon } = useApp();
  const [appIcon, setAppIcon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: selectedApp.title,
      category: selectedApp.category,
      rating: selectedApp.rating,
      description: selectedApp.description,
      icon: selectedApp.icon,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateApp(values, appId, icon);
      navigate("/dashboard/all-apps");
    },
  });

  return (
    <>
      <Card>
        <form onSubmit={formik.handleSubmit} className="px-6 lg:px-14">
          <h1 className="text-2xl mb-4">Edit App</h1>

          <section
            className={`flex flex-col flex-wrap gap-4 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {icon || formik.values.icon ? (
                <img
                  src={icon || formik.values.icon || ""}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
              {/* <InputFile
                disabled
                name="icon"
                imageName={appIcon?.name}
                onChange={(e) => {
                  setAppIcon(e.target.files[0]);
                  // console.log(appIcon);
                }}
                onUpload={() => {
                  uploadappIcon(appIcon, appId);
                }}
              >
                Upload
              </InputFile> */}
            </div>
            <Input
              width="full"
              type="text"
              label="Name:"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Input
              width="full"
              type="text"
              label="Category:"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            <Input
              width="full"
              type="text"
              label="Rating:"
              name="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
            <TextArea
              type="text"
              label="Description:"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </section>

          <div className="flex justify-end gap-8 mt-6">
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
                navigate("/dashboard/all-apps");
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
            Are you sure you want to update App details?
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

export default EditApp;
