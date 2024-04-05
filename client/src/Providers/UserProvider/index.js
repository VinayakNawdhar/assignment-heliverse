import { createSlice } from '@reduxjs/toolkit';
const usersSlice = createSlice({
 name: 'users',
 initialState: [],
 reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    removeUser: (state, action) => {
      return state.filter(user => user.id !== action.payload.id);
    },
    // Add more reducers as needed
 },
});

export const { addUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;