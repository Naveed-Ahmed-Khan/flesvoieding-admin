import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../api/videos.api";
import useUser from "../../hooks/useUser";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import useBlog from "../../hooks/useBlog";

const AllBlogsItems = ({ blog, check, setCheck }) => {
  const { deleteBlog } = useBlog();

  console.log(blog);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {blog?.imagePath ? (
              <img
                src={blog?.imagePath}
                alt=""
                className="object-cover h-20 w-20 rounded"
              />
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded" />
            )}
          </div>
          <p className="flex items-center">{blog?.title}</p>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-blog/${blog.id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete Blog!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the blog?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              deleteBlog(blog.id);
              setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllBlogsItems;
