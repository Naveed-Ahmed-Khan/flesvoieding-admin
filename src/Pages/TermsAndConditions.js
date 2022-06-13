import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import { Input } from "postcss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../api/firebase-config";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import Card from "../Components/UI/Card";
import InputFile from "../Components/UI/InputFile";
import Spinner from "../Components/UI/Spinner";
import TextArea from "../Components/UI/TextArea";
import useBlog from "../hooks/useBlog";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const { updateTerms } = useBlog();

  const [showModal, setShowModal] = useState(false);
  const [check, setChcek] = useState(false);
  const [terms, setTerms] = useState([]);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const collectionRef = collection(db, "terms");
      try {
        const fetchedData = await getDocs(collectionRef);
        setTerms(
          fetchedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsloading(false);
      } catch (error) {
        console.log(error);
        // setErrorMessage(error.message);
        alert(error);
      }
    };
    fetchData();
  }, [check]);
  console.log(terms);

  const formik = useFormik({
    initialValues: {
      term: terms[0]?.term,
      condition: terms[0]?.condition,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateTerms(
        {
          term: values.term,
          condition: values.condition,
        },
        terms[0]?.id
      );
      setChcek(!check);
      //   navigate("/dashboard");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Terms and Conditions</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <TextArea
              rows={8}
              type="text"
              label="Terms"
              name="term"
              onChange={formik.handleChange}
              value={formik.values.term}
            />
            <TextArea
              rows={8}
              type="text"
              label="Conditions"
              name="condition"
              onChange={formik.handleChange}
              value={formik.values.condition}
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
            Are you sure you want to update Terms and Conditions?
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

export default TermsAndConditions;
