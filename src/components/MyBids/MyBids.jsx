import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  const axiosSecureInstance = useAxiosSecure();

  useEffect(() => {
    axiosSecureInstance.get(`/bids?email=${user.email}`).then((data) => {
      setBids(data.data);
    });
  }, [user, axiosSecureInstance]);

  // using jwt token
  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-api-server-two.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`https://smart-deals-api-server-two.vercel.app/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-deals-api-server-two.vercel.app/bids/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bid has been deleted.",
                icon: "success",
              });

              const remainingBids = bids.filter((bid) => bid._id !== id);
              setBids(remainingBids);
            }
          });
      }
    });

    // fetch(`https://smart-deals-api-server-two.vercel.app/bids/${id}`, {
    //   method: "delete",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.deletedCount) {
    //       const remainingBids = bids.filter((bid) => bid._id !== id);
    //       setBids(remainingBids);
    //     }
    //   });
    // console.log(id);
  };

  return (
    <div>
      {/* bids for product */}
      <div>
        <h3 className="text-3xl">
          MY Bids <span className="text-primary">{bids.length}</span>
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
              <th>Status</th>
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
                      <div className="mask h-12 w-12">
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

                <td>
                  <div className="badge badge-warning">{bid.status}</div>
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteBid(bid._id)}
                    className="btn btn-ghost btn-xs btn-outline"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
