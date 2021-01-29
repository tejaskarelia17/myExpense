export default {
	weeklyExpense: (userID) => {
		return fetch(`/api/dashboard/weeklyexpense/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	expensiveGroup: (userID) => {
		return fetch(`/api/dashboard/expensivegroup/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	expensiveGroupGraph: (userID) => {
		return fetch(`/api/dashboard/expensivegroupgraph/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	monthlyGraph: async (userID) => {
		return await fetch(`/api/dashboard/monthlygraph/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	monthlyGraphYear: async (userID) => {
		return await fetch(`/api/dashboard/monthlygraphyear/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	totalExpense: (userID) => {
		return fetch(`/api/dashboard/totalexpense/${userID}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
};
