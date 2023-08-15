import { useContext, useEffect, useState } from "react";
import { PostContext } from "../store/PostContext";
import { userCollectionRef } from "../constants/collection";
import {  onSnapshot } from "firebase/firestore";

function View(){
    const { postDetails }=useContext(PostContext)
    const [userData, setUserData ] = useState(null);
    useEffect(()=>{
        getUserData();
    },[])
    console.log(postDetails,'lkk')
    const userId = postDetails.user;

    const getUserData = () => {
        onSnapshot(userCollectionRef, (querySnapshot)=>{
            const data = [];
            querySnapshot.forEach((doc) => {
                if (doc.id === userId) {
                    data.push({ id: doc.id, ...doc.data() });
                }
            });
            // console.log(data[0]);
            setUserData(data[0]);
        })
    }
    // console.log(userData,'userData');
    // console.log(postDetails.user,'productD');
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="">
                    <img
                        src={postDetails.image}
                        alt="Product"
                        className="rounded-lg shadow-lg "
                    />
                </div>
                <div>
                    <div className="border border-gray-300 p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">{postDetails.title}</h2>
                        <p className="text-gray-600 mb-4">{postDetails.description}</p>
                        <p className="text-2xl text-green-600 mb-4">₹ {postDetails.price}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Contact Seller
                        </button>
                    </div>
                    {userData && (
                        <div className="mt-6 border border-gray-300 p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Seller Details</h2>
                            <p className="text-gray-600">Name: {userData.username}</p>
                            <p className="text-gray-600">Email: {userData.email}</p>
                            <button className="bg-white text-black py-2 m-5 mt-5 w-50 px-4 rounded border-3 border-black-500 hover:bg-green-500 hover:text-white hover:border-white">
                            Chat with Seller
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default View;