import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminHero from "../components/AdminPanel/Hero/AdminHero";
import FormAddUser from "../components/AdminPanel/FormAddUser/FormAddUser";

const AddUser = () => {
  return (
    <>
      <Navbar />
      <AdminHero />
      <FormAddUser title={"Add new user"} status={"active"} />
      <Footer />
    </>
  );
};

export default AddUser;
