import React, { useEffect } from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
 const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
 }
 useEffect(() => {
    console.log(totalUsers)
 })

 return (
    <nav className="flex justify-center mt-5 py-2 w-full h-auto">
      <ul className="flex overflow-auto items-center h-10">
        {pageNumbers.map(number => (
          <li key={number} className="mr-3 hover:cursor-pointer">
            <a onClick={() => paginate(number)} className="border border-gray-300 px-3 py-1 rounded">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
 );
};

export default Pagination;