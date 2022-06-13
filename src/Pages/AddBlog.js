import { useFormik } from "formik";
import React, { useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import videoService from "../api/videos.api";
import useBlog from "../hooks/useBlog";
import InputFile from "../Components/UI/InputFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../api/firebase-config";
import Spinner from "../Components/UI/Spinner";

const AddBlog = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isImageloading, setIsImageloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePath, setImagePath] = useState("");

  const { addBlog } = useBlog();

  const uploadUserImage = async (image) => {
    setIsImageloading(true);
    const date = new Date();
    const storagePath = `blog-images/${image.name}-${date.toISOString()}`;
    console.log(storagePath);
    if (image == null) return;
    const imageRef = ref(storage, storagePath);
    await uploadBytes(imageRef, image);
    let path = await getDownloadURL(imageRef);
    console.log(path);
    setImagePath(path);
    setIsImageloading(false);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      link: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);

      if (values.title && values.description) {
        addBlog({
          title: values.title,
          description: values.description,
          link: values.link.trim().length > 0 ? values.link : "test",
          imagePath: imagePath,
        });
        navigate("/dashboard");
      }
    },
  });
  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add Blog</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <div className="flex items-center gap-6 mr-4">
              {isImageloading ? (
                <div className="grid h-32 w-44 place-content-center pl-4">
                  <Spinner />
                </div>
              ) : (
                <>
                  {imagePath ? (
                    <img
                      src={imagePath}
                      alt=""
                      className="object-contain h-32 w-44 rounded"
                    />
                  ) : (
                    <div className="h-32 w-44 bg-slate-300 rounded" />
                  )}
                </>
              )}

              <InputFile
                name="imagePath"
                imageName={selectedImage?.name}
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                }}
                onUpload={() => {
                  uploadUserImage(selectedImage);
                }}
              >
                Upload
              </InputFile>
            </div>
            <Input
              width="full"
              type="text"
              name="title"
              label="Blog Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Input
              width="full"
              type="text"
              name="link"
              label="Link"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
            <TextArea
              type="text"
              rows={6}
              placeholder="Content"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />

            <div>
              <Button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="text-base p-1">Add Blog</div>
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

export default AddBlog;
