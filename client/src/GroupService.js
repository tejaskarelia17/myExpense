export default {
	addGroup: (group) => {
		return fetch('/api/group/addgroup', {
			method: 'post',
			body: JSON.stringify(group),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	listGroups: () => {
		return fetch('/api/group/listgroups', {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
	listIndividualGroups: (user_id) => {
		return fetch(`/api/group/listgroups/${user_id}`, {
			method: 'get',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => data);
	},
};
