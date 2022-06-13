import React, { useState } from "react";
import Card from "../Components/Card";
import Input from "../Components/Input";
import { useFormik } from "formik";
import profile2 from "../Assets/Images/profile2.png";
import { Link } from "react-router-dom";
import { tutors } from "../Components/DummyData/tutors";

const AddTutor = () => {
  const [name, setName] = useState("");
  const formik = useFormik({
    initialValues: {
      tutorName: "",
    },
    onSubmit: (values) => {
      /* alert(JSON.stringify(values, null, 2)); */
      alert("Tutor Added Sucessfully!");
    },
  });
  return (
    <Card>
      <h1 className="text-2xl ">Add Tutor</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
      >
        <Input
          width="full"
          label="Tutor Name"
          type="text"
          name="tutorName"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <Input label="Email" width="full" />
        <Input label="Watsapp No." width="full" />
        <Input label="City" width="full" />
        <div>
          <select
            className="bg-slate-200 text-gray-400 rounded-sm px-6 py-4 w-full
                      md:px-14 md:py-4 outline-none"
            name="institute"
            id="institute"
            defaultValue="default"
            placeholder="Select Institute"
          >
            <option value="default">Select Institute</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </div>
        <Input label="Password" width="full" />
        <Link to="/tutor-details">
          <button
            type="submit"
            onClick={() => {
              tutors.unshift({
                tutor: name,
                img: profile2,
              });
            }}
            className="flex bg-green-500 text-white rounded-lg mx-auto px-8 py-3 md:px-10 md:py-3 md:ml-auto md:mx-0"
          >
            Next
          </button>
        </Link>
      </form>
    </Card>
  );
};

export default AddTutor;
