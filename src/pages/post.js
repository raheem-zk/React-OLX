import { useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "../store/FirebaseContext";
import { storageDB } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { productCollectionRef } from "../constants/collection";

function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const { user } = useContext(AuthContext);
    const { db } = useContext(FirebaseContext);
    const UseNavigate = useNavigate();
    useEffect(()=>{
        if(!user){
            UseNavigate('/');
        }
    },[user]);

    const date = new Date().toDateString();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!title) {
            newErrors.title = "Title is required";
        }
        if (!description) {
            newErrors.description = "Description is required";
        }
        if (!price) {
            newErrors.price = "Price is required";
        }
        if (!image || !image.type.startsWith("image/")) {
            newErrors.image = "Please select a valid image file";
        }

        setErrors(newErrors);
        console.log(db)

        if (Object.keys(newErrors).length === 0) {
            console.log('Submitting post:', { title, description, price, image });
            const imageRef = ref(storageDB,`/images/${image.name}`)
            uploadBytes(imageRef, image).then(() => {
                getDownloadURL(imageRef).then( async (url) => {
                  console.log(url,'---- url');
                  const productRef = doc( productCollectionRef );
                  console.log(productRef,' --- productRef');
                  const newData ={title,description, price, image: url, user: user.uid, createdAt: date}
                  console.log(newData)
                  await setDoc( productRef,newData )
                  .then(()=>{
                    console.log('Uploaded success !');
                    UseNavigate('/');
                  }).catch((err)=>{
                    console.log(err);
                  })
                }).catch((err) => {
                  console.log(err);
                });
              }).catch((err) => {
                console.log(err);
              });
        }
    };
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className={`mt-1 p-2 w-full border rounded focus:outline-none focus:ring ${
                            errors.title ? "border-red-500" : ""
                          }`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className={`mt-1 p-2 w-full border rounded focus:outline-none focus:ring ${
                            errors.description ? "border-red-500" : ""
                          }`}
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm">{errors.title}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                    {image && <img className="w-200 h-200 m-3" src={image ? URL.createObjectURL(image) : ''} alt="posts" />}

                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
}

export default Post;