import React from "react";
import BookDetailsCard from "../components/BookCard/BookDetailsCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  let { bookId } = useParams();
  return (
    <>
      <Navbar />
      <BookDetailsCard bookId={bookId} />
      <Footer />
    </>
  );
};

export default BookDetails;
