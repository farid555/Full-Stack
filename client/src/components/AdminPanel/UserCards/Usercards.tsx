import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import SearchBar2 from "../SearchBar/SearchBar2";
import CardUser from "./CardUser";
import UserPagination from "./UserPagination";

type UserInfo = {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
  role: string;
  status: string;
};

interface IProps {
  users: UserInfo[];
  loading: boolean;
}

const Usercards = ({ users, loading }: IProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [usersPerPage, setUsersPage] = useState<number>(6);
  const [pages, setPages] = useState<number[]>([]);

  console.log(users);

  const indexOfLastUserOfThePage = currentPageNumber * usersPerPage;
  const indexOfFirstUserOfThePage = indexOfLastUserOfThePage - usersPerPage;
  const usersOfCurrentPage = users.slice(
    indexOfFirstUserOfThePage,
    indexOfLastUserOfThePage
  );

  const paginate = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="w-full mt-20 mb-10 flex items-center justify-center">
        <SearchBar2
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          placeholder={"Search by name/email"}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Link to="/admin/add_user">
          <button className="bg-green-600 px-2 py-3 rounded-md text-white text-base">
            Add new user
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-8 my-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : (
          usersOfCurrentPage
            .filter((user) => {
              if (searchValue === "") return user;
              else if (
                user.firstName.toLowerCase().includes(searchValue.toLowerCase())
              )
                return user;
              else if (
                user.lastName.toLowerCase().includes(searchValue.toLowerCase())
              )
                return user;
              else if (user.email.includes(searchValue.toLowerCase()))
                return user;
            })
            .map((user) => (
              <CardUser
                key={user._id}
                id={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                image={user.image}
                status={user.status}
              />
            ))
        )}
      </div>
      {users && (
        <UserPagination
          totalUsers={users.length}
          usersPerPage={usersPerPage}
          paginate={paginate}
          indexOfFirstUserOfThePage={indexOfFirstUserOfThePage}
          indexOfLastUserOfThePage={indexOfLastUserOfThePage}
          currentPageNumber={currentPageNumber}
        />
      )}
    </div>
  );
};

export default Usercards;
