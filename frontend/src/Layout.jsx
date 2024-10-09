import { Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";


const Layout = () => {
  return (
    <div>
 <div className="relative ">
          <Navbar />
        </div>   
           <main>
        <Outlet /> 
      </main>
      <footer>
      <Footer />
      </footer>
    </div>
  );
};

export default Layout;
