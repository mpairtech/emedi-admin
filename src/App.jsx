import Navbar from "./components/Navbar/Navbar"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";



function App() {

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
