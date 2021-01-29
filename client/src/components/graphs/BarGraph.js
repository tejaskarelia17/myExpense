import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import DashboardService from './../../DashboardService';
import { useSelector } from 'react-redux';
import { selectUser } from './../../features/auth/authSlice';

function BarGraph() {
	const user = useSelector(selectUser);
	const [amount, setAmount] = useState([]);
	const [month, setMonth] = useState([]);
	useEffect(() => {
		DashboardService.monthlyGraph(user._id).then((data) => {
			data.forEach((d) => {
				d._id.month = moment(d._id.month, 'MM').format('MMMM');
			});
			data.sort(sorter);
			data.forEach((record) => {
				setMonth((month) => [...month, record._id.month]);
				setAmount((amount) => [...amount, record.TotalAmount]);
			});
		});
	}, []);
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const sorter = (a, b) => {
		if (a._id.year !== b._id.year) {
			return a._id.year - b._id.year;
		} else {
			return months.indexOf(a._id.month) - months.indexOf(b._id.month);
		}
	};

	const data = {
		labels: month,
		datasets: [
			{
				label: 'Months',
				data: amount,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
		options: {
			legend: {
				display: false,
			},
		},
	};
	const onChangeHandler = (e) => {
		setMonth([]);
		setAmount([]);
		if (e.target.value === '12') {
			DashboardService.monthlyGraphYear(user._id).then((data) => {
				console.log(data);
				data.forEach((d) => {
					d._id.month = moment(d._id.month, 'MM').format('MMMM');
				});
				data.sort(sorter);
				data.forEach((record) => {
					setMonth((month) => [...month, record._id.month]);
					setAmount((amount) => [...amount, record.TotalAmount]);
				});
			});
		} else if (e.target.value === '6') {
			setMonth([]);
			setAmount([]);
			DashboardService.monthlyGraph(user._id).then((data) => {
				console.log(data);
				data.forEach((d) => {
					d._id.month = moment(d._id.month, 'MM').format('MMMM');
				});
				data.sort(sorter);
				data.forEach((record) => {
					setMonth((month) => [...month, record._id.month]);
					setAmount((amount) => [...amount, record.TotalAmount]);
				});
			});
		}
	};
	return (
		<div class='card'>
			<div class='card-body'>
				<div class='clearfix'>
					<h4 class='card-title float-left'>Daily Expenses</h4>
					<div class='form-group float-right'>
						<select
							onChange={onChangeHandler}
							class='form-control'
							name='group'
							id='group'>
							<option key='6' value='6'>
								Last 6 Months
							</option>
							<option key='12' value='12'>
								Last 12 Months
							</option>
						</select>
					</div>
					<Line
						redraw
						data={data}
						width={400}
						height={200}
						options={{
							maintainAspectRatio: true,
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default BarGraph;
