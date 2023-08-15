import { onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { productCollectionRef } from "../constants/collection";
import { Link } from "react-router-dom";
import Post, { PostContext } from "../store/PostContext";

export default function Card() {
  const [products, setProducts]= useState([]);
  const {postDetails, setPostDetails} = useContext(PostContext);
  useEffect(()=>{
    getProducts();
  },[]);
  console.log(products);
  const getProducts = ()=>{
    onSnapshot(productCollectionRef, (querySnapshot)=>{
      const items =[];
      querySnapshot.forEach((doc)=>{
        items.push({ id: doc.id, ...doc.data() });
      })
      setProducts(items);
    })
  }
  console.log(postDetails)

  
  return !products ?'loading...':(
    <div className="px-32 py-5">
      <div>
        <h1 className="text-2xl">Fresh recommendations</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3 p-4">
        {products.map((product)=>(
          <div className="border border-gray-400 rounded-sm" key={product.id}>
          <div className="w-25 p-2">
            <div className="relative">
              <Link to='/view' onClick={()=> setPostDetails(product)}>
              <img
                src={product.image}
                alt="Product image"
              /> 
              </Link>
              <div className="absolute top-2 right-2 bg-white rounded-full py-1 px-2">
                <i class="fa-regular fa-heart fa-lg"></i>
              </div>
              <h3 className="font-bold text-xl mt-3">₹ {product.price}</h3>
              <p>{ product.title }</p>
              <div className="flex justify-between text-gray-400 text-sm">
                <p className="uppercase">{ product.createdAt }</p>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}
