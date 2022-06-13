import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import bookService from "../../api/books.api";

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const { docData: selectedBook, isloading } = useFetchDoc(
    `/get-book/${bookId}`
  );

  console.log(selectedBook);

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      bookTitle: selectedBook?.bookTitle,
      book: selectedBook?.book,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await bookService.updateBook(bookId, values);
      navigate("/dashboard/books");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Book</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {/* {formik.values.profilePic ? (
                <img
                  src={formik.values.profilePic}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )} */}
              {/* <InputFile
                name="imagePath"
                imageName={profilePic?.name}
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
                onUpload={() => {
                  uploadUserImage(profilePic, bookId);
                }}
              >
                Upload
              </InputFile> */}
            </div>
            <Input
              width="full"
              type="text"
              name="bookTitle"
              label="Title:"
              onChange={formik.handleChange}
              value={formik.values.bookTitle}
            />
            <Input
              width="full"
              type="text"
              name="book"
              label="Book"
              onChange={formik.handleChange}
              value={formik.values.book}
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
                navigate("/dashboard/books");
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
            Are you sure you want to update book?
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

export default EditBook;
