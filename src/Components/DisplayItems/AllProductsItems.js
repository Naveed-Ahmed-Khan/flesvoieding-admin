import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {product?.product_id?.productImage ? (
              <img
                src={product?.product_id?.productImage}
                alt=""
                className="object-cover h-20 w-20 rounded-md"
              />
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded-md" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{product?.product_id?.title}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Rating</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-semibold opacity-70">
                {product?.product_id?.rating}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <p className=" text-secondary font-semibold">
            Rs. {product?.product_id?.price}
          </p>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <p className="text-secondary font-semibold">x {product?.amount}</p>
        </div>
      </div>
      <Backdrop
        title="Remove User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the product?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              let newGroup = productCart?.filter(
                (member) => !(product._id === member._id)
              );
              setProductCart(newGroup);
              console.log(newGroup);
              // await userService.deleteUser(product._id);
              // setCheck(!check);
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

export default AllProductsItems;
