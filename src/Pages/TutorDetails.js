import React from "react";
import { useDispatch } from "react-redux";
import Card from "../Components/Card";
import Input from "../Components/Input";
import { useFormik } from "formik";
import profile2 from "../Assets/Images/profile2.png";
import { tutors } from "../Components/DummyData/tutors";
import { useNavigate } from "react-router-dom";

const TutorDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      highestQual: "",
      tutorCity: "",
      subjects: "",
      studyLevel: "",
      modes: "",
      experience: "",
    },
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      alert("Tutor Added!");
      navigate("/all-tutors");
    },
  });
  return (
    <Card>
      <h1 className="text-2xl">Tutor Details</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
      >
        <Input
          width="full"
          type="text"
          name="highestQual"
          label="Highest Qualification"
          onChange={formik.handleChange}
          value={formik.values.highestQual}
        />

        <Input
          width="full"
          type="text"
          label="Tutor City"
          name="tutorCity"
          onChange={formik.handleChange}
          value={formik.values.tutorCity}
        />
        <Input
          width="full"
          type="text"
          label="Subjects"
          name="subjects"
          onChange={formik.handleChange}
          value={formik.values.subjects}
        />

        <Input
          width="full"
          type="text"
          label="Study level I can teach"
          name="studyLevel"
          onChange={formik.handleChange}
          value={formik.values.studyLevel}
        />
        <div>
          <select
            className="bg-slate-200 text-gray-400 rounded-sm px-6 py-4 w-full
                      md:px-14 md:py-4 outline-none"
            name="institute"
            id="institute"
            defaultValue="default"
            placeholder="Select Institute"
          >
            <option value="default">Modes</option>
            <option value="I can visit student Home to teach">
              I can visit student Home to teach
            </option>
            <option value="Students can visit me for tution">
              Students can visit me for tution
            </option>
            <option value="I can teach online">I can teach online</option>
          </select>
        </div>
        <div>
          <select
            className="bg-slate-200 text-gray-400 rounded-sm px-6 py-4 w-full
                      md:px-14 md:py-4 outline-none"
            name="institute"
            id="institute"
            defaultValue="default"
            placeholder="Select Institute"
          >
            <option value="default">Experience in years</option>
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="flex bg-green-500 text-white rounded-lg mx-auto  px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
          >
            Add Tutor
          </button>
        </div>
      </form>
    </Card>
  );
};

export default TutorDetails;
