import { Routes, Route } from "react-router-dom";
 import Home from "../pages/Home";
 import Login from "../pages/Login";
 import Signup from "../pages/Signup";
 import CreateBlog from "../pages/CreateBlog";
 import EditBlog from "../pages/EditBlog";
 import MyBlogs from "../pages/MyBlogs";
 import PrivateRoute from "../components/PrivateRoute"; // Import the PrivateRoute
 import PublicRoute from "../components/PublicRoute"; // Import the PublicRoute
 import BlogPost from "../pages/BlogPost"; // Import the BlogPost component

 const AppRoutes = () => {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/create" element={<PrivateRoute element={<CreateBlog />} />} />
      <Route path="/edit/:id" element={<PrivateRoute element={<EditBlog />} />} />
      <Route path="/my-blogs" element={<PrivateRoute element={<MyBlogs />} />} />
      <Route path="/blogs/:id" element={<PrivateRoute element={<BlogPost />}/>} />


      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
     </Routes>
  );
 };

 export default AppRoutes;