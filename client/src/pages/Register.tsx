import React from "react";
import FormAddUser from "../components/AdminPanel/FormAddUser/FormAddUser";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Register = () => {
  return (
    <>
      <Navbar />
      <FormAddUser title={"Sign up"} status={"disabled"} />
      <Footer />
    </>
  );
};

export default Register;
