import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase-config";

const useCategory = () => {
  const categoriesCollectionRef = collection(db, "categories");

  const addCategory = async (values) => {
    await addDoc(categoriesCollectionRef, values);
  };

  const deleteCategory = async (categoryId) => {
    const categoryDoc = doc(categoriesCollectionRef, categoryId);
    deleteDoc(categoryDoc);
  };

  const updateCategory = async (values, categoryId) => {
    const categoryDoc = doc(categoriesCollectionRef, categoryId);
    await updateDoc(categoryDoc, {
      name: values.name,
      //   desciption: values.description,
      //   imagePath: imagePath,
    });
  };

  return { addCategory, deleteCategory, updateCategory };
};

export default useCategory;
