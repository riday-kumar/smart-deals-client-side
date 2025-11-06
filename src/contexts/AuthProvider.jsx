import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/Firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUserWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observe user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("current user is:", currentUser);
      const loggedUser = { email: currentUser?.email };
      if (currentUser) {
        fetch("https://smart-deals-api-server-two.vercel.app/getToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Crucial for sending JSON
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("after getting token", data);
            localStorage.setItem("token", data.token);
          });
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    createUserWithEmail,
    signInWithGoogle,
    user,
    setUser,
    loading,
    setLoading,
    signInUser,
    logOut,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
