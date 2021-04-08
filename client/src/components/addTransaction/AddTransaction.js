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
	selectGroups,
} from './../../features/transaction/transactionSlice';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiCurrencyUsd } from '@mdi/js';
import { Link } from 'react-router-dom';

function AddTransaction() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const groups = useSelector(selectGroups);
	const transaction = useSelector(selectTransactions);
	const [message, setMessage] = useState('');
	const [newTransaction, setNewTransaction] = useState({ user_id: user._id });

	const onChangeHandler = (e) => {
		setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		TransactionService.addTransaction(newTransaction).then((data) => {
			const { message } = data;
			setMessage(message);
			{
				message.messageError
					? Swal.fire('Oops...', message.messageBody, 'error')
					: Swal.fire('Yaaayy', message.messageBody, 'success');
			}
			resetForm();
		});
	};
	const resetForm = () => {
		setNewTransaction({
			name: '',
			description: '',
			amount: '',
		});
		document.getElementById('addTransactionForm').reset();
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
								<h3 class='page-title center__title'>
									<span class='page-title-icon bg-gradient-primary text-white mr-2'>
										<Icon
											className='title__icon'
											path={mdiCurrencyUsd}
											title='Transaction'
											size={0.8}
										/>
									</span>
									Transactions
								</h3>
							</div>
							<div className='row'>
								<div className='col-md-6 grid-margin stretch-card'>
									<div className='card'>
										<div className='card-body'>
											<h4 className='card-title'>Add bill</h4>
											<p className='card-description'></p>
											<form
												onSubmit={formSubmitHandler}
												id='addTransactionForm'
												className='forms-sample'>
												<div className='form-group'>
													<label htmlFor='name'>Name</label>
													<input
														type='text'
														onChange={onChangeHandler}
														className='form-control'
														id='name'
														name='name'
														placeholder='Name'
													/>
												</div>
												<div className='form-group'>
													<label htmlFor='amount'>Amount</label>
													<input
														type='number'
														onChange={onChangeHandler}
														className='form-control'
														id='amount'
														name='amount'
														placeholder='Amount'
													/>
												</div>
												<div className='form-group'>
													<label htmlFor='group'>Group</label>
													<select
														onChange={onChangeHandler}
														class='form-control'
														name='group'
														id='group'>
														<option key='default' value=''>
															Select Group
														</option>
														{groups.map((group, _i) => {
															return (
																<option key={_i} value={group.name}>
																	{group.name}
																</option>
															);
														})}
													</select>
												</div>
												<div className='form-group'>
													<label htmlFor='description'>Description</label>
													<input
														type='text'
														onChange={onChangeHandler}
														className='form-control'
														id='description'
														name='description'
														placeholder='Description'
													/>
												</div>
												<button
													type='submit'
													className='btn btn-gradient-primary mr-2'>
													Submit
												</button>
												<button type='reset' className='btn btn-light'>
													Cancel
												</button>
											</form>
										</div>
									</div>
								</div>
								<div className='col-lg-6 grid-margin stretch-card'>
									<div className='card'>
										<div className='card-body'>
											<h4 className='card-title'>Latest Transactions</h4>
											<p className='card-description'></p>
											<table className='table'>
												<thead>
													<tr>
														<th>Name</th>
														<th>Description</th>
														<th>Group</th>
														<th>Amount</th>
														<th>Date</th>
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
															</tr>
														);
													})}
												</tbody>
											</table>
											<Link className='bottomLink' to='/transaction'>
												Check all transactions
											</Link>
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

export default AddTransaction;
