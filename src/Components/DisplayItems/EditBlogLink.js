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

const EditBlogLink = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { updateBlogLink } = useBlog();

  const [showModal, setShowModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async (blogId) => {
      setIsloading(true);
      const blogLinksRef = collection(db, "blogLinks");
      try {
        const fetchedData = await getDoc(doc(blogLinksRef, blogId));
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
      link: blog?.link,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateBlogLink(values, blogId);
      navigate("/dashboard/blogLinks");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Blog Link</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
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
              label="Blog Link"
              name="link"
              onChange={formik.handleChange}
              value={formik.values.link}
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
                navigate("/dashboard/blogLinks");
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

export default EditBlogLink;
