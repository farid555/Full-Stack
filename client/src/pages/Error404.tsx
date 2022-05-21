import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Error404 = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center">
        <h1 className="text-6xl font-bold text-red-600">
          Error, 404 not found!
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Error404;
