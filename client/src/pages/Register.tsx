import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormAddUser from "../components/AdminPanel/FormAddUser/FormAddUser";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useAppSelector } from "../hooks/useRedux";

const Register = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <FormAddUser title={"Sign up"} status={"disabled"} />
      <Footer />
    </>
  );
};

export default Register;
