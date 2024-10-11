import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
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

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <div className="h-[10vh]">

          <Navbar />
          </div>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/login" element={<LoginForm />} />

              <Route path="/CreateBlog" element={<CreateBlog />} />
              <Route path="/PreviewBlog" element={<PreviewBlog />} />

              <Route path="/:category" element={<CategoryPage />} />
              <Route path="/:category/:slug" element={<SingleBlogPage />} />       <Route path="/CB" element={<CB />} />
              <Route path="/EditBlog" element={<EditBlog />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </main>
          <Footer />
        </div>

      </Router>
    );
  }
}

export default App;


