import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { selectUser } from './../../features/auth/authSlice';
import GroupService from './../../GroupService';
import {
	updateGroups,
	selectGroups,
} from './../../features/transaction/transactionSlice';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiClipboardMultiple } from '@mdi/js';

function Group() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const groups = useSelector(selectGroups);
	const [message, setMessage] = useState('');
	const [newGroup, setNewGroup] = useState({ user_id: user._id });

	const onChangeHandler = (e) => {
		setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
	};

	const formSubmitHandler = (e) => {
		e.preventDefault();
		GroupService.addGroup(newGroup).then((data) => {
			const { message } = data;
			setMessage(message);
			resetForm();
		});
	};
	const resetForm = () => {
		setNewGroup({
			name: '',
			description: '',
		});
		document.getElementById('addGroupForm').reset();
	};
	useEffect(() => {
		GroupService.listIndividualGroups(user._id).then((data) => {
			dispatch(
				updateGroups({
					data,
				})
			);
		});
	}, [groups]);

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
											path={mdiClipboardMultiple}
											className='title__icon'
											title='Group'
											size={0.8}
										/>
									</span>
									Groups
								</h3>
							</div>
							<div className='row'>
								<div class='col-md-6 grid-margin stretch-card'>
									<div class='card'>
										<div class='card-body'>
											<h4 class='card-title'>Add Group</h4>
											<p class='card-description'></p>
											<form
												onSubmit={formSubmitHandler}
												id='addGroupForm'
												class='forms-sample'>
												<div class='form-group'>
													<label htmlFor='name'>Group Name</label>
													<input
														type='text'
														class='form-control'
														id='name'
														name='name'
														placeholder='Group Name'
														onChange={onChangeHandler}
													/>
												</div>
												<div class='form-group'>
													<label htmlFor='description'>Group Description</label>
													<input
														type='text'
														class='form-control'
														id='description'
														name='description'
														placeholder='Group Description'
														onChange={onChangeHandler}
													/>
												</div>

												<button
													type='submit'
													class='btn btn-gradient-primary mr-2'>
													Submit
												</button>
												<button type='reset' class='btn btn-light'>
													Cancel
												</button>
											</form>
										</div>
									</div>
								</div>
								<div class='col-lg-6 grid-margin stretch-card'>
									<div class='card'>
										<div class='card-body'>
											<h4 class='card-title'>All Groups</h4>
											<p class='card-description'></p>
											<table class='table'>
												<thead>
													<tr>
														<th>Name</th>
														<th>Description</th>
														<th>Created</th>
													</tr>
												</thead>
												<tbody>
													{groups?.map((group, _i) => {
														return (
															<tr key={_i}>
																<td>{group?.name}</td>
																<td>{group?.description}</td>
																<td>
																	{moment(group?.date).format('D MMM YYYY')}
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

export default Group;
