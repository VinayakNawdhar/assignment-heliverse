import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Pagination from './Pagination'; 
import { addUser } from '../Providers/UserProvider';

const UserList = () => {
 const users = useSelector(state => state.users);
 const [currentPage, setCurrentPage] = React.useState(1);
 const [usersPerPage] = React.useState(20);
 const dispatch = useDispatch();

 React.useEffect(() => {
    axios.get('http://localhost:3001/api/users')
      .then(resp => {
        resp.data.map((obj,i) => {
            if(i<500){
                dispatch(addUser(obj))
            }
        })
        console.log(resp.data)
      })
      .catch(error => console.error(error));
 }, []);

 // Get current users
 const [allUsers,setAllUsers] = useState([])
 const indexOfLastUser = currentPage * usersPerPage;
 const indexOfFirstUser = indexOfLastUser - usersPerPage;
 const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

 const [name,setName] = useState("");
 const [domain,setDomain] = useState("");
 const [gender,setGender] = useState("");

 useEffect(() => {
    setAllUsers(users)
    if(name){
        setAllUsers(allUsers.filter(user => (user.first_name+user.last_name).toLowerCase().includes(name.toLowerCase())))
    }
    if(domain){
        setAllUsers(allUsers.filter(user => (user.domain).toLowerCase().includes(domain.toLowerCase())))
    }
    if(gender){
        setAllUsers(allUsers.filter(user => (user.gender.slice(0,1).toLowerCase() == gender)))
    }
},[name,users,domain,gender])

const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(allUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
 }

 
 return (
    <>
     <div className='text-md p-3 flex gap-5'>
        <input type="text" className='border-gray-500 border-2 p-1 rounded-lg' placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
        <input type="text" className='border-gray-500 border-2 p-1 rounded-lg' placeholder='Domain' value={domain} onChange={e => setDomain(e.target.value)} />
        <select name="" className='border-gray-500 border-2 p-1 rounded-lg' id="" onChange={e => setGender(e.target.value)}>
            <option value="">Gender</option>
            <option value="m">M</option>
            <option value="f">F</option>
        </select>
     </div>
     <div className="flex flex-wrap justify-center p-5 bg-gray-100">
      {currentUsers.map(user => (
        <div key={user.id} className="w-[250px] bg-gray-200 rounded text-center overflow-hidden shadow-lg m-4">
          <img className="w-full" src={user.avatar} alt={user.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{user.name}</div>
            <p className="text-gray-700 text-base">{user.first_name + " " + user.last_name}</p>
            <p className="text-gray-700 text-base">{user.gender}</p>
            <p className="text-gray-700 text-base">{user.domain}</p>
          </div>
        </div>
      ))}
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
      {/* <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={paginate} /> */}
    </div>
    </>
   
 );
};

export default UserList;
