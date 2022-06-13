import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../../api/firebase-config";
import TextArea from "../UI/TextArea";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useBlog from "../../hooks/useBlog";
import Spinner from "../UI/Spinner";

const EditBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { updateBlog } = useBlog();

  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isImageloading, setIsImageloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePath, setImagePath] = useState("");

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

  useEffect(() => {
    const fetchData = async (blogId) => {
      setIsloading(true);
      const collectionRef = collection(db, "blogs");
      try {
        const fetchedData = await getDoc(doc(collectionRef, blogId));
        console.log(fetchedData.data());
        setBlog(fetchedData.data());
        setIsloading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        alert(error);
      }
    };
    fetchData(blogId);
  }, [blogId]);

  const formik = useFormik({
    initialValues: {
      title: blog?.title,
      description: blog?.description,
      link: blog?.link === "test" ? "" : blog?.link,
      imagePath: blog?.imagePath,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (imagePath.length === 0) {
        updateBlog(
          {
            title: values.title,
            description: values.description,
            link: values.link.trim().length > 0 ? values.link : "test",
          },
          blogId
        );
      } else {
        updateBlog(
          {
            title: values.title,
            description: values.description,
            link: values.link.trim().length > 0 ? values.link : "test",
            imagePath: imagePath,
          },
          blogId
        );
      }

      navigate("/dashboard");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Blog</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {isImageloading ? (
                <div className="grid h-20 w-20 place-content-center pl-4">
                  <Spinner />
                </div>
              ) : (
                <>
                  {imagePath || blog?.imagePath ? (
                    <img
                      src={imagePath || blog?.imagePath}
                      alt=""
                      className="object-cover h-20 w-20 rounded"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-slate-300 rounded" />
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
              label="Title"
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
              rows={8}
              type="text"
              label="Content"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
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
                navigate("/dashboard");
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
            Are you sure you want to update Blog?
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

export default EditBlog;
