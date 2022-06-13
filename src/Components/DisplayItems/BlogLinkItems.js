import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBlog from "../../hooks/useBlog";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const BlogLinkItems = ({ blogLink, check, setCheck }) => {
  console.log(blogLink);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { deleteBlogLink } = useBlog();

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          {/* <div className="grid place-items-center mr-4">
            {blogLink?.profilePic ? (
              <img
                src={blogLink?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div> */}

          <p className="flex items-center">{blogLink?.title}</p>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-blogLink/${blogLink?.id}`);
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
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the blogLink?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              deleteBlogLink(blogLink.id);
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

export default BlogLinkItems;
