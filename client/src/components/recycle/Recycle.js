import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { selectUser } from './../../features/auth/authSlice';
import TransactionService from './../../TransactionService';
import {
	updateDeletedTransactions,
	selectDeletedTransactions,
} from './../../features/transaction/transactionSlice';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';

function Recycle() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const deletedTransaction = useSelector(selectDeletedTransactions);
	const [message, setMessage] = useState('');

	const restoreEntry = (e) => {
		TransactionService.restoreTransactions(e).then((data) => {});
	};
	const deleteEntry = (e) => {
		TransactionService.deleteTransactionsPermanently(e).then((data) => {});
	};

	useEffect(() => {
		TransactionService.listDeletedTransactions(user._id).then((data) => {
			dispatch(
				updateDeletedTransactions({
					data,
				})
			);
		});
	}, [deletedTransaction]);
	return (
		<div class='container-scroller'>
			<Header />
			<div class='container-fluid page-body-wrapper'>
				<Sidebar />
				<div class='main-panel'>
					<div class='content-wrapper'>
						<div class='content-wrapper'>
							<div class='page-header'>
								<h3 class='page-title center__title'>
									<span class='page-title-icon bg-gradient-primary text-white mr-2'>
										<Icon
											path={mdiDelete}
											className='title__icon'
											title='Recycle'
											size={0.8}
										/>
									</span>
									Recycle
								</h3>
							</div>
							<div className='row'>
								<div class='col-lg-12 grid-margin stretch-card'>
									<div class='card'>
										<div class='card-body'>
											<h4 class='card-title'>Deleted Transactions</h4>
											<p class='card-description'></p>
											<table class='table'>
												<thead>
													<tr>
														<th>Name</th>
														<th>Description</th>
														<th>Group</th>
														<th>Amount</th>
														<th>Date</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
													{deletedTransaction?.map((entry, _i) => {
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
																<td>
																	{moment(entry?.date).format('D MMM YYYY')}
																</td>
																<td>
																	<button
																		type='button'
																		class='btn btn-inverse-success btn-fw'
																		onClick={() => restoreEntry(entry?._id)}>
																		Restore
																	</button>
																	<button
																		type='button'
																		class='btn btn-inverse-danger btn-fw mx-1'
																		onClick={() => deleteEntry(entry?._id)}>
																		Delete
																	</button>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Recycle;
