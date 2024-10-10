import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";

// Import your components as needed
import Homepage from "./Pages/Homepage";
import Layout from "./Layout";
import LoginForm from "./Pages/Login";
import Admin from "./Pages/Admin";
// import Blog from "./Pages/Blog";
// import News from "./Pages/News";
// import Entertainment from "./Pages/Entertainment";
// import Business from "./Pages/Business";
// import Sports from "./Pages/Sports";
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
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Homepage />} />
                <Route path="/admin" element={<Admin />} />
                {/* <Route path="/news" element={<News />} />
          <Route path="/business" element={<Business />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/entertainment" element={<Entertainment />} /> */}
                <Route path="/login" element={<LoginForm />} />
                {/* <Route path="/signin" element={<RegistrationForm />} /> */}
                <Route path="/CreateBlog" element={<CreateBlog />} />
                <Route path="/PreviewBlog" element={<PreviewBlog />} />
                {/* <Route path="/:category/:slug" element={<Blog />} /> */}
                <Route path="/:category" element={<CategoryPage />} />
                <Route path="/:category/:slug" element={<SingleBlogPage />} />       <Route path="/CB" element={<CB />} />
                <Route path="/EditBlog" element={<EditBlog />} />
              </Route>

            </Routes>
          </main>
          <Footer />
        </div>

      </Router>
    );
  }
}

export default App;


