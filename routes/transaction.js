const express = require('express'),
	transactionRouter = express.Router();
const Transaction = require('./../models/Transaction');

transactionRouter.post('/addtransaction', (request, response) => {
	const { name, description, user_id, amount, group } = request.body;
	const newTransaction = new Transaction({
		name,
		description,
		user_id,
		amount,
		group,
		date: new Date(),
	});
	newTransaction.save((error) => {
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
					messageBody: 'Transaction added successfully 🥳',
					messageError: false,
				},
			});
		}
	});
});

transactionRouter.get('/listtrecent/:userID', (request, response) => {
	Transaction.find(
		{ user_id: request.params.userID, isDeleted: false },
		(error, transactions) => {
			if (error)
				response.status(500).json({
					message: {
						messageBody: 'Encountered an error 😵',
						messageError: true,
					},
				});
			else {
				response.status(200).json(transactions);
			}
		}
	)
		.sort({ date: -1 })
		.limit(7);
});

transactionRouter.get('/listtransaction/:userID', (request, response) => {
	Transaction.find(
		{ user_id: request.params.userID, isDeleted: false },
		(error, transactions) => {
			if (error)
				response.status(500).json({
					message: {
						messageBody: 'Encountered an error 😵',
						messageError: true,
					},
				});
			else {
				response.status(200).json(transactions);
			}
		}
	);
});

transactionRouter.get(
	'/listdeletedtransaction/:userID',
	(request, response) => {
		Transaction.find(
			{ user_id: request.params.userID, isDeleted: true },
			(error, transactions) => {
				if (error)
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				else {
					response.status(200).json(transactions);
				}
			}
		);
	}
);

transactionRouter.put(
	'/deletetransaction/:transactionID',
	(request, response) => {
		Transaction.updateOne(
			{ _id: request.params.transactionID },
			{ $set: { isDeleted: true } },
			function (error, result) {
				if (error)
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				else {
					response.status(200);
				}
			}
		);
	}
);

transactionRouter.put(
	'/restoretransaction/:transactionID',
	(request, response) => {
		Transaction.updateOne(
			{ _id: request.params.transactionID },
			{ $set: { isDeleted: false } },
			function (error, result) {
				if (error)
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				else {
					response.status(200);
				}
			}
		);
	}
);

transactionRouter.delete(
	'/deletetransactionspermanently/:transactionID',
	(request, response) => {
		Transaction.deleteOne(
			{ _id: request.params.transactionID },
			(error, result) => {
				if (error)
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				else {
					response.status(200);
				}
			}
		);
	}
);

module.exports = transactionRouter;
