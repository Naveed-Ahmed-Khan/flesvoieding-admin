import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productCartService from "../../api/productCart.api";
import videoService from "../../api/videos.api";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const ProductCartsItems = ({ productCart, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {productCart?.user_id?.profilePic ? (
              <img
                src={productCart?.user_id?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{productCart?.user_id?.userName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[14px]">Cart items</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary text-[16px] font-semibold opacity-70">
                {productCart?.products?.length}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-productCart/${productCart._id}`);
            }}
          >
            Approve
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
        Are you sure you want to delete the product cart?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await productCartService.deleteProductCart(productCart._id);
              setShowModal(false);
              setCheck(!check);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default ProductCartsItems;
