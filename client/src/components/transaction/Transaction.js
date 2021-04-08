import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import { selectUser } from './../../features/auth/authSlice';
import TransactionService from './../../TransactionService';
import GroupService from './../../GroupService';
import {
	updateTransactions,
	selectTransactions,
	updateGroups,
} from './../../features/transaction/transactionSlice';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiCurrencyUsd } from '@mdi/js';

function Transaction() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const transaction = useSelector(selectTransactions);

	const deleteEntry = (e) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'Do you really want to delete this expense',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, keep it',
		}).then((result) => {
			if (result.value) {
				TransactionService.deleteTransactions(e).then((data) => {});
				Swal.fire('Deleted!', 'The expense has been deleted.', 'success');
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				Swal.fire('Aborted!', '', 'error');
			}
		});
	};

	useEffect(() => {
		GroupService.listIndividualGroups(user._id).then((data) => {
			dispatch(
				updateGroups({
					data,
				})
			);
		});
		TransactionService.listIndividualTransactions(user._id).then((data) => {
			dispatch(
				updateTransactions({
					data,
				})
			);
		});
	}, [transaction]);

	return (
		<div className='container-scroller'>
			<Header />
			<div className='container-fluid page-body-wrapper'>
				<Sidebar />
				<div className='main-panel'>
					<div className='content-wrapper'>
						<div className='content-wrapper'>
							<div className='page-header'>
								<h3 className='page-title center__title'>
									<span className='page-title-icon bg-gradient-primary text-white mr-2'>
										<Icon
											path={mdiCurrencyUsd}
											className='title__icon'
											title='Dashboard'
											size={0.8}
										/>
									</span>
									Transactions
								</h3>
							</div>
							<div className='row'>
								<div className='col-lg-12 grid-margin stretch-card'>
									<div className='card'>
										<div className='card-body'>
											<h4 className='card-title'>All Transactions</h4>
											<p className='card-description'></p>
											<table className='table'>
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
																<td>
																	{moment(entry?.date).format('D MMM YYYY')}
																</td>
																<td>
																	<button
																		type='button'
																		class='btn btn-inverse-danger btn-fw'
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

export default Transaction;
