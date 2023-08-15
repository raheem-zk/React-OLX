import React, { useState } from "react";
import {  auth } from "../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { userCollectionRef } from "../constants/collection";

function SignUp({ setModal }) {
  const [mailSign, showMailSign] = useState(true);
  const [signUp, showSignUpPage] = useState(true);
  const [login, showLoginPage] = useState(true);
  const [loginEmail, setLoginEmail] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState(null);
  const [newUserPassword, setNewUserPassword] = useState(null);
  const [newUserPhone, setNewUserPhone] = useState(null);
  const [username, setUsername] = useState(null);
  

  function onclose() {
    setModal(false);
  }

  const backIcon = () => {
    showMailSign(true);
    showSignUpPage(true);
    showLoginPage(true);
  };

  const showSignuUp = () => {
    showMailSign(false);
    showSignUpPage(false);
  };

  const handleLogin = () => {
    showLoginPage(false);
    showMailSign(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential)=>{
      console.log(userCredential)
      setModal(false);
    })
    .catch((error)=>{
      console.log(error);
      alert(error.message);
    })
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(newUserEmail, newUserPassword, newUserPhone);

    createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
      .then(async (userCredential) => {
        console.log(userCredential);
        let user = userCredential.user;
        await updateProfile(user, {
          displayName: username,
        }).then(async () => {
          const userData = {
            username: username,
            email: newUserEmail,
            password: newUserPassword,
            phone: newUserPhone,
          };

          const userRef = doc(userCollectionRef , userCredential.user.uid);
          await setDoc(userRef, userData)
          .then(()=>{
            console.log("User registered and data added to Firebase");
            showLoginPage(false);
            showSignUpPage(true);  
          })
          .catch((error)=> alert(error.message))


        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  return (
    <div className="z-40 h-screen w-screen absolute top-0 flex justify-center items-center backdrop-brightness-50">
      <div className={`${mailSign ? `bg-white rounded-sm p-4` : `hidden`}`}>
        <div className="flex justify-end p-2 pt-3">
          <i onClick={onclose} className="fa-solid fa-x fa-xl cursor-pointer"></i>
        </div>
        <div className="flex justify-center items-center flex-col text-center">
          <img
            src="https://statics.olx.in/external/base/img/loginEntryPointPost.webp"
            className="w-20"
            alt="Banner"
          />
          <p className="text-cyan-900 font-semibold my-5">
            Help us become one of the safest places <br /> to buy and sell
          </p>
        </div>
        <div className="flex flex-col gap-3 my-5">
          <div className="relative flex-1 flex">
            <input
              onClick={showSignuUp}
              type="text"
              placeholder="Continue with Email address"
              className="cursor-pointer flex-1 w-96 pl-10 py-3 border-2 border-cyan-950 rounded-md placeholder-cyan-900 font-semibold hover:border-4"
            />
            <div className="absolute top-3 left-3">
              <i class="fa-regular fa-envelope fa-lg"></i>
            </div>
          </div>
          <div className="relative flex flex-1">
            <input
              disabled
              type="text"
              placeholder="Continue with Google"
              className="cursor-pointer flex-1 pl-10 py-3 border-2 border-cyan-950 rounded-md placeholder-cyan-900 font-semibold hover:border-4"
            />
            <div className="absolute top-3 left-3">
              <i className="fa-brands fa-google fa-lg"></i>
            </div>
          </div>
        </div>
        <div>
          <p className="uppercase text-center font-semibold text-sm">or</p>
        </div>
        <div className="my-3">
          <h6
            onClick={handleLogin}
            className="underline font-semibold text-center cursor-pointer"
          >
            Log in to Your OLX Account
          </h6>
        </div>
        <div className="mt-20 text-center text-xs text-gray-500">
          <div>
            <p>All your personal details are safe with us.</p>
          </div>
          <div className="mt-4">
            <p>
              if you continue, you are accepting
              <span className="text-blue-500 cursor-pointer">
                OLX Terms and <br />
                Conditions and Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className={`${signUp ? `hidden` : `bg-white rounded-sm p-4`}`}>
        <div className="flex justify-between mt-3">
          <i
            onClick={backIcon}
            className="fa-solid fa-arrow-left fa-lg cursor-pointer"
          ></i>
          <i onClick={onclose} className="fa-solid fa-x fa-xl cursor-pointer"></i>
        </div>
        <div className="flex justify-center items-center flex-col text-center">
          <img
            src="https://www.olxgroup.com/wp-content/uploads/2023/01/OLX_Logo1.svg"
            className="w-24"
            alt="Banner"
          />
          <p className="text-cyan-900 font-bold text-center text-xl my-5">
          Create Your OLX Account
          </p>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="Enter your Name"
              className="border border-gray-600 rounded-md w-96 pl-2 py-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your Email address"
              className="border border-gray-600 rounded-md mt-2 w-96 pl-2 py-2"
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter your Phone number"
              className="border border-gray-600 rounded-md mt-2 w-96 pl-2 py-2"
              onChange={(e) => setNewUserPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-gray-600 rounded-md mt-2 w-96 pl-2 py-2"
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-1 mt-10">
            <button className="bg-cyan-950 text-white py-2 font-bold rounded-sm flex-1">
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center text-gray-500 text-xs mt-2 mb-3">
          <p>
            Your contact number is never shared with external parties <br /> not
            do we use it to spam you in any way.
          </p>
        </div>
      </div>

      <div className={`${login ? `hidden` : `bg-white rounded-sm p-4`}`}>
        <div className="flex justify-between mt-3">
          <i
            onClick={backIcon}
            className="fa-solid fa-arrow-left fa-lg cursor-pointer"
          ></i>
          <i onClick={onclose} className="fa-solid fa-x fa-xl cursor-pointer"></i>
        </div>
        <div className="flex justify-center items-center flex-col text-center">
          <img
            src="https://www.olxgroup.com/wp-content/uploads/2023/01/OLX_Logo1.svg"
            className="w-24"
            alt="Banner"
          />
          <p className="text-cyan-900 font-bold text-xl my-5">
          Welcome Back! <br/>Log in to Your OLX Account
          </p>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className="flex flex-col flex-1">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-600 rounded-md w-96 pl-2 py-2"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-600 rounded-md w-96 pl-2 py-2 mt-2"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="mt-8 text-sm text-center">
            <p>
              if your are a new user please select any other login <br />
              option from previous page.
            </p>
          </div>
          <div className="flex flex-1 mt-10 ">
            <button className="bg-cyan-950 text-white py-2 font-bold rounded-sm flex-1">
              Login
            </button>
          </div>
        </form>
        <div className="text-center text-gray-500 text-xs mt-2 mb-10">
          <p>
            Your Email is never shared with external parties not do we
            <br /> use it to spam you in any way.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
