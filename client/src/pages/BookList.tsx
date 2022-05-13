import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BookCollections from "../components/userBookCollection/BookCollections";

const BookList = () => {
  return (
    <div>
      <Navbar />
      <BookCollections />
      <Footer />
    </div>
  );
};

export default BookList;
