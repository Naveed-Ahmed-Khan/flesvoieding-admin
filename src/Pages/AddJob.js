import React from "react";

import { useDispatch } from "react-redux";

import Card from "../Components/Card";
import Input from "../Components/Input";
import { useFormik } from "formik";
import { jobs, jobsApplied } from "../Components/DummyData/jobs";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const formik = useFormik({
    initialValues: {
      studentName: "",
      applicantName: "",
      subject: "",
      requirment: "",
      expectedBudget: "",
      requiredTutor: "",
      country: "",
      city: "",
      teachingMode: "",
    },
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      jobs.unshift({
        mode: values.teachingMode,
        subjects: values.subject,
        city: values.city,
        country: values.country,
      });
      jobsApplied.unshift({
        mode: values.teachingMode,
        subjects: values.subject,
        city: values.city,
        country: values.country,
        applicants: values.applicantName,
        institutes: "Asif Public School",
      });

      alert("Job Added!");
    },
  });
  return (
    <Card>
      <h1 className="text-2xl">Add Job</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
      >
        {/* For small screen */}
        <div className="flex flex-col gap-6 md:hidden">
          <Input
            width="full"
            label="Student Name"
            name="studentName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.studentName}
          />
          <Input
            type="text"
            label="Applicant Name"
            name="applicantName"
            onChange={formik.handleChange}
            value={formik.values.applicantName}
            width="full"
          />
        </div>
        {/* For medium screen and above */}
        <div className="hidden md:flex md:gap-6">
          <Input
            width="full"
            label="Student Name"
            name="studentName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.studentName}
          />
          <Input
            type="text"
            label="Applicant Name"
            name="applicantName"
            onChange={formik.handleChange}
            value={formik.values.applicantName}
            width="full"
          />
        </div>
        <Input
          width="full"
          type="text"
          name="subject"
          label="Subject for which tutor is required"
          onChange={formik.handleChange}
          value={formik.values.subject}
        />
        {/* <Input
          width="full"
          height="h-40"
          type="text"
          name="requirment"
          label="Describe your requirments"
          onChange={formik.handleChange}
          value={formik.values.requirment}
        /> */}
        <textarea
          className="
            bg-slate-200 rounded-sm px-6 py-4 max-h-28
            md:pl-14 md:py-4 outline-none"
          type="text"
          rows={5}
          placeholder="Describe your requirment"
          name="requirment"
          value={formik.values.requirment}
          onChange={formik.handleChange}
        />
        {/* For small screen */}
        <div className="flex flex-col gap-6 md:hidden">
          <Input
            width="full"
            label="Expected Budget"
            name="expectedBudget"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.expectedBudget}
          />
          <Input
            type="text"
            label="Required Tutor"
            name="requiredTutor"
            onChange={formik.handleChange}
            value={formik.values.requiredTutor}
            width="full"
          />
        </div>
        {/* For medium screen and above */}
        <div className="hidden md:flex md:gap-6">
          <Input
            width="full"
            label="Expected Budget"
            name="expectedBudget"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.expectedBudget}
          />
          <Input
            type="text"
            label="Required Tutor"
            name="requiredTutor"
            onChange={formik.handleChange}
            value={formik.values.requiredTutor}
            width="full"
          />
        </div>

        {/* For small screen */}
        <div className="flex flex-col gap-6 md:hidden">
          <Input
            width="full"
            label="City"
            name="city"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <Input
            type="text"
            label="Country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            width="full"
          />
        </div>
        {/* For medium screen and above */}
        <div className="hidden md:flex md:gap-6">
          <Input
            width="full"
            label="City"
            name="city"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          <Input
            type="text"
            label="Country"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            width="full"
          />
        </div>
        <Input
          width="full"
          type="text"
          name="teachingMode"
          label="Teaching Mode"
          onChange={formik.handleChange}
          value={formik.values.teachingMode}
        />
        <div>
          <button
            type="submit"
            className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
          >
            Add Job
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AddJob;
