import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { createUserWithEmail, signInWithGoogle, loading } = use(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    createUserWithEmail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // create user in the database
        fetch("http://localhost:5000/users", {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create Your Account</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister} className="space-y-2">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                name="password"
                placeholder="Password"
              />

              <input
                type="submit"
                className="btn btn-neutral w-full mt-4"
                value="Register"
              />
            </form>
            <button className="btn" onClick={handleGoogleSignIn}>
              <img
                className="h-5 w-5"
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                alt=""
              />{" "}
              Sign Up With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
