import React from "react";
import Navbar from "../components/Navbar/index";
import Footer from "../components/Footer/index";
import Hero from "../components/Hero/index";
import BookCollection from "../components/BookCollection/BookCollection";
import ContentInfo from "../components/ContentInfo/ContentInfo";

const Home = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <Navbar />
        <Hero />
        <BookCollection />
        <ContentInfo />
        <Footer />
      </div>
    </>
  );
};

export default Home;
