const express = require('express'),
	dashboardRouter = express.Router();
const Group = require('./../models/Group');
const Transaction = require('./../models/Transaction');

dashboardRouter.get('/weeklyexpense/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					date: {
						$gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
					},
					user_id: request.params.userID,
					isDeleted: false,
				},
			},
			{
				$group: {
					_id: '$user_id',
					TotalAmount: { $sum: '$amount' },
				},
			},
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

dashboardRouter.get('/expensivegroup/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					user_id: request.params.userID,
					isDeleted: false,
				},
			},
			{
				$group: {
					_id: '$group',
					TotalAmount: { $sum: '$amount' },
				},
			},
			{ $sort: { TotalAmount: -1 } },
			{ $limit: 1 },
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

dashboardRouter.get('/expensivegroupgraph/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					user_id: request.params.userID,
					isDeleted: false,
				},
			},
			{
				$group: {
					_id: '$group',
					TotalAmount: { $sum: '$amount' },
				},
			},
			{
				$sort: { TotalAmount: 1 },
			},
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

dashboardRouter.get('/monthlygraph/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					user_id: request.params.userID,
					isDeleted: false,
					date: {
						$gte: new Date(new Date().getTime() - 182 * 24 * 60 * 60 * 1000),
					},
				},
			},
			{
				$group: {
					_id: {
						month: { $month: '$date' },
						year: { $year: '$date' },
					},
					TotalAmount: { $sum: '$amount' },
				},
			},
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

dashboardRouter.get('/monthlygraphyear/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					user_id: request.params.userID,
					isDeleted: false,
					date: {
						$gte: new Date(new Date().getTime() - 372 * 24 * 60 * 60 * 1000),
					},
				},
			},
			{
				$group: {
					_id: {
						month: { $month: '$date' },
						year: { $year: '$date' },
					},
					TotalAmount: { $sum: '$amount' },
				},
			},
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

dashboardRouter.get('/totalexpense/:userID', (request, response) => {
	Transaction.aggregate(
		[
			{
				$match: {
					user_id: request.params.userID,
					isDeleted: false,
				},
			},
			{
				$group: {
					_id: '$userID',
					TotalAmount: { $sum: '$amount' },
				},
			},
		],
		(error, result) => {
			if (error) console.error(error);
			response.send(result);
		}
	);
});

module.exports = dashboardRouter;
