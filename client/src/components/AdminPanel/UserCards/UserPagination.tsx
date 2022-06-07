import React from "react";

interface IProps {
  totalUsers: number;
  usersPerPage: number;
  paginate: (pageNumber: number) => void;
  indexOfFirstUserOfThePage: number;
  indexOfLastUserOfThePage: number;
  currentPageNumber: number;
}

const UserPagination = ({
  totalUsers,
  usersPerPage,
  paginate,
  indexOfFirstUserOfThePage,
  indexOfLastUserOfThePage,
  currentPageNumber,
}: IProps) => {
  const pageNo: number[] = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++)
    pageNo.push(i);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          onClick={() => paginate(currentPageNumber - 1)}
          className={`${
            currentPageNumber === 1 ? "hidden" : "relative"
          }relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
        >
          Previous
        </a>
        <a
          onClick={() => paginate(currentPageNumber + 1)}
          className={`${
            currentPageNumber === pageNo.length ? "hidden" : "relative"
          } ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing&nbsp;
            <span className="font-medium">
              {indexOfFirstUserOfThePage}&nbsp;
            </span>
            to&nbsp;
            <span className="font-medium">
              {indexOfLastUserOfThePage}&nbsp;
            </span>
            of&nbsp;
            <span className="font-medium">{totalUsers}&nbsp;</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              onClick={() => paginate(currentPageNumber - 1)}
              className={`${
                currentPageNumber === 1 ? "hidden" : "relative"
              } inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {pageNo &&
              pageNo.map((page, idx) => (
                <a
                  key={idx}
                  onClick={() => paginate(page)}
                  aria-current="page"
                  className={` z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPageNumber === page
                      ? "text-black"
                      : "cursor-pointer bg-indigo-50 border-indigo-500 text-indigo-600"
                  } `}
                >
                  {" "}
                  {page}{" "}
                </a>
              ))}

            <a
              onClick={() => paginate(currentPageNumber + 1)}
              className={`${
                currentPageNumber === pageNo.length ? "hidden" : "relative"
              }  inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserPagination;
