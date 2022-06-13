import React, { useEffect, useState } from "react";

import Input from "../UI/Input";
import { useFormik } from "formik";

import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import TextArea from "../UI/TextArea";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";
import AllMembersItems from "./AllMembersItems";
import useFetchDoc from "../../hooks/useFetchDoc";
import useFetch from "../../hooks/useFetch";
import groupService from "../../api/groups.api";
import productCartService from "../../api/productCart.api";
import AllProductsItems from "./AllProductsItems";

const EditProductCart = () => {
  const navigate = useNavigate();
  const { productCartId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const { docData: selectedProductCart, isloading } = useFetchDoc(
    `/get-productCart/${productCartId}`
  );
  const { data: allProductCarts } = useFetch(`/get-productCarts`, true);

  // console.log(productCarts);

  const totalCartPrice = (cart) => {
    if (cart) {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.product_id.price * item.amount;
      });
      return totalPrice;
    }
  };

  useEffect(() => {
    setProductCart(selectedProductCart?.products);
  }, [selectedProductCart?.products]);

  console.log(productCart);

  const formik = useFormik({
    initialValues: {
      userName: selectedProductCart?.user_id?.userName,
      profilePic: selectedProductCart?.user_id?.profilePic,
      productCart: productCart,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      /* await productCartService.updateProductCart(productCartId, {
        products: productCart,
      }); */
      navigate("/dashboard/productCarts");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-4 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Approve Product Cart</h1>

          <div
            className={`flex flex-col gap-4 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {formik.values.profilePic ? (
                <img
                  src={formik.values.profilePic}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
            </div>

            <Input
              disabled
              type="text"
              name="userName"
              label="Cart Owner:"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <div className="shadow-sm">
              <h2 className="flex items-center justify-between mb-3">
                <p className="text-secondary text-xl font-semibold">Products</p>
                {/* <Button
                  type={"button"}
                  onClick={() => {
                    setIsMember(false);

                    let preMember = group.filter(
                      (member) => member.email === formik.values.memberEmail
                    );
                    console.log(preMember.length);
                    if (preMember.length === 0) {
                      let filteredUser = productCarts.filter(
                        (user) => user.email === formik.values.memberEmail
                      );
                      setGroup([...group, filteredUser[0]]);
                      console.log(group);
                    } else {
                      setIsMember(true);
                    }
                  }}
                >
                  <div className="text-base p-1">Add User</div>
                </Button> */}
              </h2>

              <div
                className={`flex flex-col gap-3 h-[45vh] pl-2 py-2 rounded border border-gray-500
                md:overflow-y-auto md:min-w-max lg:pl-4 lg:py-4
                scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-300  
                transition-opacity duration-500 ease-out ${
                  isloading ? "opacity-50" : "opacity-100"
                }
                `}
              >
                {productCart &&
                  productCart?.map((product) => (
                    <AllProductsItems
                      key={product._id}
                      product={product}
                      productCart={productCart}
                      setProductCart={setProductCart}
                    />
                  ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-2 pr-[3vw]">
              <h3 className=" text-secondary font-semibold text-lg">
                Total Cart Price :
              </h3>
              <p className=" text-primary font-semibold text-lg">
                Rs. {totalCartPrice(productCart)}
              </p>
              <p></p>
            </div>
          </div>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                // console.log(group.members);
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Approve</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/ProductCarts");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>

          {/* <Backdrop
            title="Duplicate"
            show={isMember}
            onClick={() => setIsMember(false)}
          >
            Cannot add the same member twice !
            <div className="self-end">
              <Button type={"button"} onClick={() => setIsMember(false)}>
                OK
              </Button>
            </div>
          </Backdrop> */}

          <Backdrop
            title="Approve"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to Approve cart?
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

export default EditProductCart;
