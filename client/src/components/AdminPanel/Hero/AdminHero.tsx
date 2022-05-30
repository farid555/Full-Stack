import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const AdminHero = () => {
  return (
    <div className="mt-20">
      <div style={{ backgroundColor: "#aed6eb" }} className="py-32 px-32">
        <div className="flex justify-between">
          <div className="pl-20 flex flex-col">
            <div className="mt-14">
              <h1
                style={{ fontSize: "6rem" }}
                className=" text-black text-center font-title font-bold"
              >
                User Admin...
              </h1>
            </div>
            <div className="flex justify-center align-center items-center space-x-8 ">
              <button className="rounded-full hover:scale-125 text-xl bg-violet-700 px-6 py-4 hover:bg-violet-600 duration-400 transition-all ease-in-out text-white">
                Dashboard
              </button>
              <Link to="/book_info">
                <button className="rounded-full hover:scale-125 text-xl bg-violet-700 px-6 py-4 hover:bg-violet-600 duration-400 transition-all ease-in-out text-white">
                  Book Information
                </button>
              </Link>
              <Link to="/user_info">
                <button className="rounded-full hover:scale-125 text-xl bg-violet-700 px-6 py-4 hover:bg-violet-600 duration-400 transition-all ease-in-out text-white">
                  User Information
                </button>
              </Link>
            </div>
          </div>
          <div className="">
            <CgProfile className="h-72 w-72 text-white text-xs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
