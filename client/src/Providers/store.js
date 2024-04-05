import {configureStore} from '@reduxjs/toolkit'
import usersReducer from './UserProvider/index'
export const store = configureStore({
  reducer : {
    users : usersReducer
  }  
})