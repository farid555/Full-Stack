import React from "react";
import { useParams } from "react-router-dom";
import AdminHero from "../components/AdminPanel/Hero/AdminHero";
import UpdateUserInfo from "../components/AdminPanel/UpdateUserInfo/UpdateUserInfo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const UpdateUser = () => {
  const { userId } = useParams();

  console.log(userId);

  return (
    <>
      <Navbar />
      <AdminHero />
      <UpdateUserInfo id={userId} />
      <Footer />
    </>
  );
};

export default UpdateUser;
