import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Blogs from "./components/pages/Blogs";
import SingleBlog from "./components/pages/SingleBlog";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AllAuthors from "./components/pages/AllAuthors";
import { Context } from "./main"; // Ensure this path is correct
import axios from "axios";
import UpdateBlog from "./components/pages/UpdateBlog";

const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, user, setBlogs } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/myprofile",
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser({});
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/blog/all",
          { withCredentials: true }
        );
        setBlogs(data.allBlogs);
      } catch (error) {
        setBlogs([]);
      }
    };

    fetchUser();
    fetchBlogs();
  }, [isAuthenticated, user, setUser, setIsAuthenticated, setBlogs]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blog/:id" element={<SingleBlog />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/authors" element={<AllAuthors />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/blog/update/:id" element={<UpdateBlog />}></Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
