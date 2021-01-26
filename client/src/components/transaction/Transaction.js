import React from 'react';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Icon from '@mdi/react';
import { mdiCurrencyUsd } from '@mdi/js';

function Transaction() {
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
								<div class='col-lg-12 grid-margin stretch-card'>
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

export default Transaction;
