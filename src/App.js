import React, { useContext, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/Footer";
import Home from "./pages/home";
import { AuthContext, FirebaseContext } from "./store/FirebaseContext";
import Post from "./pages/post";
import View from "./pages/View";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:'/post',
        element:<Post/>
      },
      {
        path:'/view',
        element:<View/>,
      }
    ],
  },
]);

const App = () => {
  const {user, setUser} = useContext(AuthContext)
  const {db, auth}  = useContext(FirebaseContext)
  useEffect(() => {
    console.log(user);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log(user);
  }, [db, setUser]);
  return <RouterProvider router={router} />;
};


export default App;