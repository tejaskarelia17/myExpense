export default {
	addTransaction: (transaction) => {
		return fetch('/api/transaction/addtransaction', {
			method: 'post',
			body: JSON.stringify(transaction),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	listIndividualTransactions: (user_id) => {
		return fetch(`/api/transaction/listtransaction/${user_id}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	listRecentTransactions: (user_id) => {
		return fetch(`/api/transaction/listtrecent/${user_id}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	listDeletedTransactions: (user_id) => {
		return fetch(`/api/transaction/listdeletedtransaction/${user_id}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	deleteTransactions: (transaction_id) => {
		return fetch(`/api/transaction/deletetransaction/${transaction_id}`, {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	restoreTransactions: (transaction_id) => {
		return fetch(`/api/transaction/restoretransaction/${transaction_id}`, {
			method: 'put',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	deleteTransactionsPermanently: (transaction_id) => {
		return fetch(
			`/api/transaction/deletetransactionspermanently/${transaction_id}`,
			{
				method: 'delete',
				headers: {
					'Content-type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((data) => data);
	},
};
