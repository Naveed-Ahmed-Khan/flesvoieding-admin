import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase-config";

const useBlog = () => {
  const blogsCollectionRef = collection(db, "blogs");
  const blogLinkCollectionRef = collection(db, "blogLinks");

  const addBlog = async (values) => {
    await addDoc(blogsCollectionRef, values);
  };
  const addBlogLink = async (values) => {
    await addDoc(blogLinkCollectionRef, values);
  };

  const deleteBlog = async (blogId) => {
    const categoryDoc = doc(blogsCollectionRef, blogId);
    deleteDoc(categoryDoc);
  };
  const deleteBlogLink = async (blogId) => {
    const categoryDoc = doc(blogLinkCollectionRef, blogId);
    deleteDoc(categoryDoc);
  };

  const updateBlog = async (values, blogId) => {
    const categoryDoc = doc(blogsCollectionRef, blogId);
    await updateDoc(categoryDoc, values);
  };
  const updateBlogLink = async (values, blogId) => {
    const categoryDoc = doc(blogLinkCollectionRef, blogId);
    await updateDoc(categoryDoc, values);
  };

  return {
    addBlog,
    addBlogLink,
    deleteBlogLink,
    deleteBlog,
    updateBlogLink,
    updateBlog,
  };
};

export default useBlog;
