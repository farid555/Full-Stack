import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import SearchBar2 from "../SearchBar/SearchBar2";
import CardUser from "./CardUser";

interface UserInfo {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
}

const Usercards = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserInfo[]>([]);

  console.log(users);

  useEffect(() => {
    const getUsersInfo = async () => {
      const res: AxiosResponse<UserInfo[]> = await api.get("api/v1/users");
      const data: UserInfo[] = res.data;
      // console.log(data);
      setUsers(data.filter((user) => user.role !== "admin"));
      setLoading(false);
    };
    getUsersInfo();
  }, []);

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
      <div className="grid grid-cols-6 gap-8 my-4">
        {loading && (
          <div className="flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          users &&
          users.map((user) => (
            <CardUser
              key={user._id}
              id={user._id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              image={user.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Usercards;
