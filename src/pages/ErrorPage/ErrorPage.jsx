import React from "react";
import { useNavigate } from "react-router-dom";
import pageNotFound from "../../../public/page_not_found.gif";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <div>
        <img className="h-screen w-screen" src={pageNotFound} alt="" />
      </div>
      <div className="absolute bottom-12">
        <button
          onClick={() => navigate("/admin")}
          className="text-lg font-bold bg-red-700 px-2 py-1 rounded-md text-white w-32"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
