import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import ProductCard from "../ProductCard/ProductCard";
import Swal from "sweetalert2";
import axios from "axios";

const ProductDetails = () => {
  const singleProduct = useLoaderData();
  const popUpRef = useRef(null);
  const { user, loading } = use(AuthContext);
  const [bids, setBids] = useState([]);

  console.log(user);
  const { _id: productId } = singleProduct;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/bids/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((data) => {
        console.log("after axios get", data);
        setBids(data.data);
      });
  }, [productId, user.accessToken]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/products/bids/${productId}`, {
  //     headers: {
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setBids(data);
  //     });
  // }, [productId, user]);

  const handlePopUp = () => {
    popUpRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bidAmount.value;
    // const product_id = productId;

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:5000/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          popUpRef.current.close();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bit has been placed",
            showConfirmButton: false,
            timer: 1500,
          });

          // add the new buyer to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          const sortedBids = newBids.sort(
            (a, b) => Number(b.bid_price) - Number(a.bid_price)
          );
          setBids(sortedBids); // sorting is not working.
        }
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        {/* u will show product info + img */}
        <button onClick={handlePopUp} className="btn btn-primary">
          I want to Buy this product
        </button>

        <dialog ref={popUpRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best Offer!</h3>
            <p className="py-4">Offer something seller can not resist</p>
            <div>
              <form onSubmit={handleBidSubmit}>
                <fieldset className="fieldset">
                  {/* name */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    readOnly
                    defaultValue={user?.displayName}
                  />
                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    defaultValue={user?.email}
                    readOnly
                  />
                  {/* bid amount */}
                  <label className="label">Bid Amount</label>
                  <input
                    type="text"
                    className="input"
                    name="bidAmount"
                    placeholder="Your Bid"
                  />

                  <button className="btn btn-neutral mt-4">
                    Place Your Bid
                  </button>
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

        {/* bids for product */}
        <div>
          <h3 className="text-3xl">
            Bids for this product{" "}
            <span className="text-primary">{bids.length}</span>
          </h3>
        </div>
        {/* bids table */}
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={bid.buyer_image} alt="Avatar" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default ProductDetails;
