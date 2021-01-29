import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import transactionReducer from '../features/transaction/transactionSlice';

export default configureStore({
	reducer: {
		auth: authReducer,
		transaction: transactionReducer,
	},
});
