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
import bookRequestService from "../../api/bookRequests.api";

const EditBookRequest = () => {
  const navigate = useNavigate();
  const { bookRequestId } = useParams();

  const { docData: selectedBookRequest, isloading } = useFetchDoc(
    `/get-bookRequest/${bookRequestId}`
  );

  console.log(selectedBookRequest);

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      bookRequestLink: selectedBookRequest?.bookRequestLink,
      // book: selectedBookRequest?.book,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await bookRequestService.updateBookRequest(bookRequestId, values);
      navigate("/dashboard/book-requests");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Book Request</h1>
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
                  uploadUserImage(profilePic, bookRequestId);
                }}
              >
                Upload
              </InputFile> */}
            </div>
            <Input
              width="full"
              type="text"
              name="bookRequestLink"
              label="Book Request:"
              onChange={formik.handleChange}
              value={formik.values.bookRequestLink}
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
                navigate("/dashboard/book-requests");
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
            Are you sure you want to update book request?
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

export default EditBookRequest;
