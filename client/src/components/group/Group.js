import React from 'react';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiClipboardMultiple } from '@mdi/js';

function Group() {
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
											<h4 class='card-title'>Default form</h4>
											<p class='card-description'> Basic form layout </p>
											<form class='forms-sample'>
												<div class='form-group'>
													<label for='exampleInputUsername1'>Username</label>
													<input
														type='text'
														class='form-control'
														id='exampleInputUsername1'
														placeholder='Username'
													/>
												</div>
												<div class='form-group'>
													<label for='exampleInputEmail1'>Email address</label>
													<input
														type='email'
														class='form-control'
														id='exampleInputEmail1'
														placeholder='Email'
													/>
												</div>
												<div class='form-group'>
													<label for='exampleInputPassword1'>Password</label>
													<input
														type='password'
														class='form-control'
														id='exampleInputPassword1'
														placeholder='Password'
													/>
												</div>
												<div class='form-group'>
													<label for='exampleInputConfirmPassword1'>
														Confirm Password
													</label>
													<input
														type='password'
														class='form-control'
														id='exampleInputConfirmPassword1'
														placeholder='Password'
													/>
												</div>
												<div class='form-check form-check-flat form-check-primary'>
													<label class='form-check-label'>
														<input type='checkbox' class='form-check-input' />{' '}
														Remember me{' '}
													</label>
												</div>
												<button
													type='submit'
													class='btn btn-gradient-primary mr-2'>
													Submit
												</button>
												<button class='btn btn-light'>Cancel</button>
											</form>
										</div>
									</div>
								</div>
								<div class='col-lg-6 grid-margin stretch-card'>
									<div class='card'>
										<div class='card-body'>
											<h4 class='card-title'>Basic Table</h4>
											<p class='card-description'>
												{' '}
												Add class <code>.table</code>
											</p>
											<table class='table'>
												<thead>
													<tr>
														<th>Profile</th>
														<th>VatNo.</th>
														<th>Created</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>Jacob</td>
														<td>53275531</td>
														<td>12 May 2017</td>
														<td>
															<label class='badge badge-danger'>Pending</label>
														</td>
													</tr>
													<tr>
														<td>Messsy</td>
														<td>53275532</td>
														<td>15 May 2017</td>
														<td>
															<label class='badge badge-warning'>
																In progress
															</label>
														</td>
													</tr>
													<tr>
														<td>John</td>
														<td>53275533</td>
														<td>14 May 2017</td>
														<td>
															<label class='badge badge-info'>Fixed</label>
														</td>
													</tr>
													<tr>
														<td>Peter</td>
														<td>53275534</td>
														<td>16 May 2017</td>
														<td>
															<label class='badge badge-success'>
																Completed
															</label>
														</td>
													</tr>
													<tr>
														<td>Dave</td>
														<td>53275535</td>
														<td>20 May 2017</td>
														<td>
															<label class='badge badge-warning'>
																In progress
															</label>
														</td>
													</tr>
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
