import React, { useState } from "react";
import bcrypt from "bcryptjs";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Install() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [access, setAccess] = useState(false);
  const [masterPass, setMasterPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const adminData = {
      email,
      password: await bcrypt.hash(password, 10),
      firstName,
      lastName,
      role: "admin",
      status: "active",
    };

    try {
      const res = await api.post("api/v1/users", adminData);
      toast.success("Admin created successfully !!");
      navigate("/login");
      console.log(res);
    } catch (e: any) {
      toast.error(e);
      console.log(e);
    }
  };

  const handleAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (masterPass === "787898") {
      setAccess(true);
    } else {
      setError("Access Denied!");
    }
  };

  if (!access) {
    return (
      <div className="bg-black flex items-center justify-center h-screen w-full flex-col">
        {error && (
          <h1 className="text-red-600 text-4xl font-semibold my-4">{error}</h1>
        )}
        <h1 className="text-red-600 text-3xl font-semibold my-4">
          Please enter the master password !!!
        </h1>
        <div className="flex items-center justify-center space-x-6">
          <form onSubmit={handleAccess}>
            <input
              type="password"
              value={masterPass}
              onChange={(e) => {
                setError("");
                setMasterPass(e.target.value);
              }}
              className="px-2 py-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 px-6 py-2 mx-6 rounded-full text-white text-lg font-semibold my-4"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div
          className="
            font-sans
            bg-gray-500 bg-opacity-60
            w-full
            min-h-screen
            flex justify-center items-center
            h-full 
            top-0
            backdrop-filter backdrop-blur-lg 
        "
        >
          <link
            href="https://fonts.googleapis.com/css?family=Poppins"
            rel="stylesheet"
          />
          <div
            className="
                px-6
                p-2
                bg-white
                relative
                justify-center
                items-center
                w-1/2 
                m-auto 
                mx-auto
                h-1/3
                sm:h-1/3
                md:w-1/3
                md:h-1/3
                
                lg: mx-5
                lg:h-1/3
                rounded-3xl
                filter
                drop-shadow-2xl
            "
          >
            <div className="flex p-1 sm:mt-4 border-black items-center justify-between">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-600 tracking-wider ml-1 text-sm sm:text-md font-bold">
                  Library Management System
                </p>
              </div>
            </div>
            <div className="mt-3  sm:mt-5">
              <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
                Manage your freelance business with us!
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Takes less than 10 minutes to fill out all the information
                needed to register your bussiness
              </p>
            </div>
            <div className="mt-1 sm:mt-8">
              <form action="" className="flex-col flex" onSubmit={handleSubmit}>
                <label
                  htmlFor="email"
                  className="text-gray-700 text-xs sm:text-md"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                                w-full
                                h-4
                                sm:h-9
                                border-b-2 border-gray-300
                                focus:border-blue-300
                                outline-none
                            "
                  required
                />
                <label
                  htmlFor="firstName"
                  className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="
                                w-full
                                h-4
                                sm:h-9
                                border-b-2 border-gray-300
                                focus:border-blue-300
                                outline-none
                            "
                  required
                />

                <label
                  htmlFor="lastName"
                  className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="
                                w-full
                                h-4
                                sm:h-9
                                border-b-2 border-gray-300
                                focus:border-blue-300
                                outline-none
                            "
                  required
                />
                <label
                  htmlFor="password"
                  className="text-gray-700 mt-1 sm:mt-5 text-xs sm:text-md"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                                                w-full
                                                h-4
                                                sm:h-9
                                                border-b-2 border-gray-300
                                                focus:border-blue-300
                                                outline-none
                                            "
                  required
                />
                <div className="justify-center flex-col items-center mt-2 sm:mt-8 flex">
                  <button
                    type="submit"
                    className="
                        bg-blue-600
                        text-gray-100
                        rounded-md
                        h-8
                        sm:h-auto
                        sm:rounded-lg
                        w-20
                        sm:w-52
                        p-1
                        text-xs
                        sm:text-md
                        sm:p-3
                    "
                  >
                    Create Admin
                  </button>
                  <p className="text-gray-600 text-xs my-2 sm:my-5 sm:text-md">
                    By signing up you are agreeing to our
                    <a href="#" className="text-black text-xs sm:text-md">
                      Terms and Conditions
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Install;
