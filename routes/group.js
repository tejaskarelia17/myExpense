const express = require('express'),
	groupRouter = express.Router();
const Group = require('./../models/Group');

groupRouter.post('/addgroup', (request, response) => {
	const { name, description, user_id } = request.body;
	Group.findOne({ name }, (error, group) => {
		if (error)
			response.status(500).json({
				message: {
					messageBody: 'Encountered an error 😵',
					messageError: true,
				},
			});
		if (group)
			response.status(400).json({
				message: {
					messageBody: 'Group already exists 🤔',
					messageError: true,
				},
			});
		else {
			const newGroup = new Group({
				name,
				description,
				user_id,
				date: new Date(),
			});
			newGroup.save((error) => {
				if (error) {
					console.error(error);
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				} else {
					response.status(201).json({
						message: {
							messageBody: 'Group added successfully 🥳',
							messageError: false,
						},
					});
				}
			});
		}
	});
});

groupRouter.get('/listgroups', (request, response) => {
	Group.find((error, groups) => {
		if (error)
			response.status(500).json({
				message: {
					messageBody: 'Encountered an error 😵',
					messageError: true,
				},
			});
		else {
			response.status(200).json(groups);
		}
	});
});

groupRouter.get('/listgroups/:userID', (request, response) => {
	Group.find({ user_id: request.params.userID }, (error, groups) => {
		if (error)
			response.status(500).json({
				message: {
					messageBody: 'Encountered an error 😵',
					messageError: true,
				},
			});
		else {
			response.status(200).json(groups);
		}
	});
});

module.exports = groupRouter;
