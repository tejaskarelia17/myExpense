import { createSlice } from '@reduxjs/toolkit';

export const transactionSlice = createSlice({
	name: 'transaction',
	initialState: {
		groups: [],
		group: null,
		transactions: null,
		recentTransactions: null,
		deletedTransactions: null,
	},
	reducers: {
		logout: (state) => {
			state.groups = [];
			state.group = null;
			state.transactions = null;
		},
		updateGroups: (state, action) => {
			state.groups = action.payload.data;
		},
		updateTransactions: (state, action) => {
			state.transactions = action.payload.data;
		},
		updateRecentTransactions: (state, action) => {
			state.recentTransactions = action.payload.data;
		},
		updateDeletedTransactions: (state, action) => {
			state.deletedTransactions = action.payload.data;
		},
	},
});

export const {
	updateGroups,
	updateTransactions,
	updateDeletedTransactions,
	updateRecentTransactions,
} = transactionSlice.actions;

export const selectGroups = (state) => state.transaction.groups;
export const selectGroup = (state) => state.transaction.group;
export const selectTransactions = (state) => state.transaction.transactions;
export const selectRecentTransactions = (state) =>
	state.transaction.recentTransactions;
export const selectDeletedTransactions = (state) =>
	state.transaction.deletedTransactions;

export default transactionSlice.reducer;
