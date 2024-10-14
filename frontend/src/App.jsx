/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import NavbarAdmin from "./Component/AdminPanel/NavbarAdmin";

import Footer from "./Component/Footer";
import NotFound from './Component/NotFound';

// Import your components as needed
import Homepage from "./Pages/Homepage";
import LoginForm from "./Pages/Login";
import Admin from "./Pages/Admin";
import CreateBlog from "./Pages/CreateBlog";
import PreviewBlog from "./Pages/PreviewBlog";
import CB from "./Pages/CB";
import EditBlog from "./Pages/EditBlog";
import CategoryPage from "./Pages/CategoryPage";
import SingleBlogPage from "./Pages/SingleBlogPage";

// Custom component to conditionally render Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/Admin");

  return (
    <>
      <div className="h-[10vh]">
        {/* Conditionally render AdminNavbar for admin pages, otherwise render Navbar */}
        {isAdminRoute ? <NavbarAdmin /> : <Navbar />}
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
};

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Layout>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/Admin/CreateBlog" element={<CreateBlog />} />
              <Route path="/Admin/PreviewBlog" element={<PreviewBlog />} />
              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/Admin/:category" element={<CategoryPage />} />
              <Route path="/:category/:slug" element={<SingleBlogPage />} />
              <Route path="/Admin/:category/:slug" element={<SingleBlogPage />} />
              <Route path="/CB" element={<CB />} />
              <Route path="/EditBlog" element={<EditBlog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
