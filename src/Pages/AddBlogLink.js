import { useFormik } from "formik";
import React, { useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import useBlog from "../hooks/useBlog";

const AddBlogLink = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { addBlogLink } = useBlog();

  const formik = useFormik({
    initialValues: {
      title: "",
      link: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (values.title && values.link) {
        addBlogLink(values);
        navigate("/dashboard/blogLinks");
      }
    },
  });
  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add Blog Link</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <Input
              width="full"
              type="text"
              name="title"
              label="Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Input
              width="full"
              type="text"
              name="link"
              label="Blog Link"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
            <div>
              <Button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="text-base p-1">Add Blog Link</div>
              </Button>
            </div>
            <Backdrop
              title="Add Blog"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              Do you want to add this Blog ?
              <div className="self-end">
                <Button
                  type={"submit"}
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Yes
                </Button>
              </div>
            </Backdrop>
          </form>
        </div>
      </Card>
    </>
  );
};

export default AddBlogLink;
