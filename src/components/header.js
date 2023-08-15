import React, { useContext, useState } from "react";
import SignUp from "./SignUp";
import { AuthContext, FirebaseContext } from "../store/FirebaseContext";
import { Link } from "react-router-dom";

 function Header() {
  const [modal, setModal] = useState(false);
  const {user} = useContext(AuthContext)
  const {db, auth} = useContext(FirebaseContext);

  console.log(user, 'its from header');
  const showModal = () => {
    setModal(true);
  };
  const Logout = ()=>{
    auth.signOut();
  }
  return (
    <>
      {modal ? <SignUp setModal={setModal} /> : ""}
      <div className="bg-gray-100">
        <div className="flex justify-between py-3 px-28">
          <div>
            <img
              src="https://www.olxgroup.com/wp-content/uploads/2023/01/OLX_Logo1.svg"
              className="w-16"
              alt="olxLogo"
            />
          </div>
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute top-2 left-3 transform translate-y-1/2"></i>
            <input
              disabled
              type="text"
              placeholder="india"
              className="rounded-md border-2 border-black p-2 pl-11 pr-10 text-lg text-gray-900 bg-white"
            />
            <i className="fa-solid fa-angle-down fa-xl absolute top-6 right-3 transform translate-y-1/2 cursor-pointer"></i>
          </div>
          <div className="flex flex-1 ml-5">
            <input
              type="text"
              placeholder="Find Cars,Mobile Phones and more..."
              className="flex-1 rounded-l-md border-2 border-black p-2 text-lg text-gray-900 bg-white"
            />
            <div className="bg-cyan-950 rounded-r-md px-3">
              <i className="fa-solid fa-magnifying-glass fa-lg text-white mt-5"></i>
            </div>
          </div>
          <h4 className="font-semibold mt-2 ml-5 mr-2">ENGLISH</h4>
          <i className="fa-solid fa-angle-down fa-xl mt-5"></i>
          <p
            onClick={user ? undefined : showModal}
            className="font-bold mt-2 underline ml-7 cursor-pointer hover:no-underline"
          >
            { user ? `Welcom ${user.displayName }` : 'Login'}
          </p>
          { user && <p
          onClick={Logout}
            className="font-bold mt-2 underline ml-7 cursor-pointer hover:no-underline"
          >
            Logout
          </p> }
          {user ? <Link to='/post' className="relative font-bold ml-5 rounded-full px-6 uppercase cursor-pointer shadow-lg overflow-hidden">
            <i className="fa-solid fa-plus fa-lg mt-6"></i> Sell
            <span className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-l-yellow-400 border-x-blue-600 border-b-yellow-400"></span>
          </Link> : <Link  onClick={user ? undefined : showModal} className="relative font-bold ml-5 rounded-full px-6 uppercase cursor-pointer shadow-lg overflow-hidden">
            <i className="fa-solid fa-plus fa-lg mt-6"></i> Sell
            <span className="absolute inset-0 rounded-full border-4 border-t-blue-400 border-l-yellow-400 border-x-blue-600 border-b-yellow-400"></span>
          </Link>}
          
        </div>
      </div>
    </>
  );
}


export default Header;