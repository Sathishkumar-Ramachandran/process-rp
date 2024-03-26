import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  role: null,
  bankName: null,
  isAuthenticated: false, 
  // Add other user data properties as needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { userId, role, bankName, ...otherData } = action.payload; // Destructure data
      state.userId = userId;
      state.role = role;
      state.bankName = bankName;
      state.isAuthenticated = true;
      // Update other user data properties as needed (from otherData)
    },
    setIsAuthenticated : (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
