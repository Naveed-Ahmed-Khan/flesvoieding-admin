import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import InputFile from "../UI/InputFile";
import useFetchDoc from "../../hooks/useFetchDoc";
import visaService from "../../api/visa.api";

const EditVisaRequest = () => {
  const navigate = useNavigate();
  const { visaRequestId } = useParams();

  const { docData: selectedVisaRequest, isloading } = useFetchDoc(
    `/get-visa/${visaRequestId}`
  );

  console.log(selectedVisaRequest);

  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: selectedVisaRequest?.fullName,
      motherName: selectedVisaRequest?.motherName,
      email: selectedVisaRequest?.email,
      contact: selectedVisaRequest?.contact,
      address: selectedVisaRequest?.address,
      dateOfBirth: selectedVisaRequest?.dateOfBirth,
      visaRequestDate: selectedVisaRequest?.visaRequestDate,
      umrahDuration: selectedVisaRequest?.umrahDuration,
      visaType: selectedVisaRequest?.visaType,
      passportSizePhoto: selectedVisaRequest?.passportSizePhoto,
      idCardFront: selectedVisaRequest?.idCardFront,
      idCardBack: selectedVisaRequest?.idCardBack,
      passport: selectedVisaRequest?.passport,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await visaService.updateVisa(visaRequestId, values);
      navigate("/dashboard/visa-requests");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Visa Request</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {formik.values.passportSizePhoto ? (
                <img
                  src={formik.values.passportSizePhoto}
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
                  uploadUserImage(profilePic, visaRequestId);
                }}
              >
                Upload
              </InputFile> */}
            </div>
            <Input
              width="full"
              type="text"
              name="fullName"
              label="Applicant Name:"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            <Input
              width="full"
              type="text"
              name="motherName"
              label="Mother's Name:"
              onChange={formik.handleChange}
              value={formik.values.motherName}
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
            <Input
              width="full"
              type="text"
              label="Date of Birth"
              name="dateOfBirth"
              onChange={formik.handleChange}
              value={formik.values.dateOfBirth}
            />
            <Input
              width="full"
              type="text"
              label="Visa Request Date"
              name="visaRequestDate"
              onChange={formik.handleChange}
              value={formik.values.visaRequestDate}
            />
            <Input
              width="full"
              type="text"
              label="Visa Type"
              name="visaType"
              onChange={formik.handleChange}
              value={formik.values.visaType}
            />
            {formik.values.visaType?.toLowerCase() === "umrah" && (
              <Input
                width="full"
                type="text"
                label="Umrah Duration"
                name="umrahDuration"
                onChange={formik.handleChange}
                value={formik.values.umrahDuration}
              />
            )}

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
                navigate("/dashboard/visa-requests");
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

export default EditVisaRequest;
