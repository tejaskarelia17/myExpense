import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { selectUser } from './../../features/auth/authSlice';
import TransactionService from './../../TransactionService';
import {
	selectRecentTransactions,
	updateRecentTransactions,
} from './../../features/transaction/transactionSlice';

function Tables() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const transaction = useSelector(selectRecentTransactions);

	useEffect(() => {
		TransactionService.listRecentTransactions(user._id).then((data) => {
			dispatch(
				updateRecentTransactions({
					data,
				})
			);
		});
	}, [transaction]);
	return (
		<div class='card'>
			<div class='card-body'>
				<h4 class='card-title'>Recent Transactions</h4>
				<div class='table-responsive'>
					<table class='table'>
						<thead>
							<tr>
								<th> Name </th>
								<th> Description </th>
								<th> Group </th>
								<th> Amount </th>
								<th> Date </th>
							</tr>
						</thead>
						<tbody>
							{transaction?.map((entry, _i) => {
								return (
									<tr key={_i}>
										<td>{entry?.name}</td>
										<td>{entry?.description}</td>
										<td>{entry?.group}</td>
										<CurrencyFormat
											renderText={(value) => <td>{value}</td>}
											decimalScale={2}
											value={entry?.amount}
											displayType='text'
											thousandSeparator={true}
											prefix={'$'}
										/>
										<td>{moment(entry?.date).format('D MMM YYYY')}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<Link className='bottomLinkHomePage' to='/transaction'>
						Check all transactions
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Tables;
