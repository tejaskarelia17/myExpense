import React, { useState, useEffect } from 'react';
import DashboardService from './../../DashboardService';
import { useSelector } from 'react-redux';
import { selectUser } from './../../features/auth/authSlice';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { mdiChartLine } from '@mdi/js';

//Import Components
import TopWidget from './../widgets/topWidget/TopWidget';
import TopWidgetExpense from './../widgets/topWidget/TopWidgetExpense';
import BarGraph from './../graphs/BarGraph';
import DonutGraph from './../graphs/DonutGraph';
import Tables from './../tables/Tables';

//Import Static Assets

function Main() {
	const user = useSelector(selectUser);
	const [weeklyExpense, setNewWeeklyExpense] = useState('');
	const [expensiveGroup, setExpensiveGroup] = useState({
		_id: 'Not Applicable',
		TotalAmount: '0',
	});
	const [totalExpense, setTotalExpense] = useState('');
	const [cardClass, setCardClass] = useState('');
	useEffect(() => {
		DashboardService.weeklyExpense(user._id).then((data) => {
			setNewWeeklyExpense(data[0]?.TotalAmount);
		});
		DashboardService.expensiveGroup(user._id)
			.then((data) => {
				setExpensiveGroup(data[0]);
			})
			.catch(() => {
				console.log(typeof expensiveGroup);
			});
		DashboardService.totalExpense(user._id).then((data) => {
			setTotalExpense(data[0]?.TotalAmount);
		});
		{
			totalExpense < user.setBudget
				? setCardClass('card bg-gradient-red card-img-holder text-white')
				: setCardClass('card bg-gradient-success card-img-holder text-white');
		}
	}, [user]);
	return (
		<div class='content-wrapper'>
			<div class='page-header'>
				<h3 class='page-title center__title'>
					<span class='page-title-icon bg-gradient-primary text-white mr-2'>
						<Icon
							className='title__icon'
							path={mdiHome}
							title='Dashboard'
							size={0.8}
						/>
					</span>
					Dashboard
				</h3>
			</div>
			<div class='row'>
				<div class='col-md-4 stretch-card grid-margin'>
					<TopWidget
						title='Weekly Expense'
						value={weeklyExpense}
						icon={mdiChartLine}
					/>
				</div>
				<div class='col-md-4 stretch-card grid-margin'>
					<TopWidget
						title='Most Expensive Group'
						value={expensiveGroup?.TotalAmount}
						subValue={expensiveGroup?._id}
						icon={mdiChartLine}
					/>
				</div>
				<div class='col-md-4 stretch-card grid-margin'>
					<TopWidgetExpense
						title='Total Expense'
						value={totalExpense}
						icon={mdiChartLine}
						cardClass={cardClass}
					/>
				</div>
			</div>
			<div class='row'>
				<div class='col-md-7 grid-margin stretch-card'>
					<BarGraph />
				</div>
				<div class='col-md-5 grid-margin stretch-card'>
					<DonutGraph />
				</div>
			</div>
			<div class='row'>
				<div class='col-12 grid-margin'>
					<Tables />
				</div>
			</div>
		</div>
	);
}

export default Main;
