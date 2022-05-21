import React from "react";
import { Link } from "react-router-dom";
import SearchBar2 from "../SearchBar/SearchBar2";
import CardUser from "./CardUser";

const Usercards = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full mt-20 mb-10 flex items-center justify-center">
        <SearchBar2 />
      </div>
      <div className="flex justify-end space-x-2">
        <Link to="/add_user">
          <button className="bg-green-600 px-2 py-3 rounded-md text-white text-base">
            Add new user
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8 my-4">
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
      </div>
    </div>
  );
};

export default Usercards;
