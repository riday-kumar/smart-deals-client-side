import axios from "axios";
import React, { useRef } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateAProduct = () => {
  const { user } = useAuth();
  console.log(user);
  //   const instance = useAxios();
  const axiosSecureInstance = useAxiosSecure();

  const popUpRef = useRef(null);
  const handlePopUp = () => {
    popUpRef.current.showModal();
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const min_price = e.target.min_price.value;
    const max_price = e.target.max_price.value;
    const email = user.email;
    const seller_name = user.displayName;
    console.log(title, image, min_price, max_price, email, seller_name);

    const newProduct = {
      title,
      image,
      min_price,
      max_price,
      email,
      seller_name,
    };

    // fetch("https://smart-deals-api-server-two.vercel.app/products", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newProduct),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    // using axios directly without instance
    // axios.post("https://smart-deals-api-server-two.vercel.app/products", newProduct).then((data) => {
    //   if (data.data.insertedId) {
    //     e.target.reset();
    //     popUpRef.current.close();

    //     Swal.fire({
    //       title: "Success!",
    //       text: "New Product Added Successfully",
    //       icon: "success",
    //     });
    //   }
    // });

    // using Axios Instance
    // instance.post("https://smart-deals-api-server-two.vercel.app/products", newProduct).then((data) => {
    //   if (data.data.insertedId) {
    //     e.target.reset();
    //     popUpRef.current.close();

    //     Swal.fire({
    //       title: "Success!",
    //       text: "New Product Added Successfully",
    //       icon: "success",
    //     });
    //   }
    // });

    // using Axios Secure Instance for passing Token
    axiosSecureInstance
      .post(
        "https://smart-deals-api-server-two.vercel.app/products",
        newProduct
      )
      .then((data) => {
        if (data.data.insertedId) {
          e.target.reset();
          popUpRef.current.close();

          Swal.fire({
            title: "Success!",
            text: "New Product Added Successfully",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl my-10 text-center font-bold">create product</h1>
      <div>
        <button onClick={handlePopUp} className="btn btn-primary">
          Create A Product
        </button>

        <dialog ref={popUpRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">My New Product</h3>
            <div>
              <form onSubmit={handleCreateProduct}>
                <fieldset className="fieldset *:w-full">
                  {/* Product Title */}
                  <label className="label">Product Title</label>
                  <input type="text" className="input" name="title" />
                  {/* Image Url */}
                  <label className="label">Image Url</label>
                  <input type="text" className="input" name="image" />
                  {/* min Price */}
                  <label className="label">Min Price </label>
                  <input
                    type="text"
                    className="input"
                    name="min_price"
                    placeholder="Minimum Price"
                  />
                  {/* max Price */}
                  <label className="label">Max Price </label>
                  <input
                    type="text"
                    className="input"
                    name="max_price"
                    placeholder="Maximum Price"
                  />

                  <button className="btn btn-neutral mt-4">Add Product</button>
                </fieldset>
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default CreateAProduct;
