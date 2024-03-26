import { createAction } from '@reduxjs/toolkit'; // Assuming you're using Redux Toolkit


export const setUserData = createAction('USER/SET_DATA');
export const setIsAuthenticated = createAction('USER/SET_IS_AUTHENTICATED');

// export const setUserId = createAction('USER/SET_ID');
// export const setRole = createAction('USER/SET_ROLE');
// export const setBankName = createAction('USER/SET_BANK_NAME');
