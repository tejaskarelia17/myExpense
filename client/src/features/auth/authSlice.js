import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isAuthenticated: false,
		isLoaded: false,
	},
	reducers: {
		logout: (state) => {
			state.user = '';
			state.isAuthenticated = false;
		},
		login: (state, action) => {
			state.user = action.payload.user;
			state.isAuthenticated = action.payload.isAuthenticated;
		},
		register: (state, action) => {
			state.user = action.payload.user;
			state.isAuthenticated = action.payload.isAuthenticated;
		},
	},
});

export const { logout, login, register } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
