import { useEffect, useState } from 'react'
import axios from "axios"
import UserList from './Components/UserList'
function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1 className='text-center py-4 text-3xl font-semibold bg-gray-800 text-gray-100'>Users List</h1>
      <UserList />
    </>
  )
}

export default App
