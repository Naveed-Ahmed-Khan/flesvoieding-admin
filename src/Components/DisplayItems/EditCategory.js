import React, { useEffect, useState } from "react";

import Input from "../UI/Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../api/firebase-config";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import useCategory from "../../hooks/useCategory";

const EditCategory = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { docData: selectedCategory, isloading } = useFetchDoc(
    "categories",
    categoryId
  );

  // console.log(selectedCategory);

  const { updateCategory } = useCategory();
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: selectedCategory.name,
      description: selectedCategory.description,
      //   imagePath: selectedCategory.imagePath,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateCategory(values, categoryId);
      navigate("/dashboard/categories");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Category</h1>

          <Input
            width="full"
            type="text"
            name="name"
            label="Name:"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <TextArea
            rows={4}
            type="text"
            label="Description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />

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
            Are you sure you want to update Category details?
            <div className="self-end mt-4">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                Yes
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditCategory;
