import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import DashboardService from './../../DashboardService';
import { useSelector } from 'react-redux';
import { selectUser } from './../../features/auth/authSlice';

function DonutGraph() {
	const user = useSelector(selectUser);
	const [groupName, setGroupName] = useState([]);
	const [amount, setAmount] = useState([]);
	const [backgroundColor, setBackgroundColor] = useState([
		'#FF6384',
		'#36A2EB',
		'#f96868',
		'#FFCE56',
		'#E91E63',
	]);
	useEffect(() => {
		DashboardService.expensiveGroupGraph(user._id).then((data) => {
			data.forEach((record) => {
				setGroupName((groupName) => [...groupName, record._id]);
				setAmount((amount) => [...amount, record.TotalAmount]);
			});
		});
	}, []);
	if (backgroundColor.length < groupName.length) {
		for (let i = backgroundColor.length; i < groupName.length; i++) {
			var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
			setBackgroundColor((backgroundColor) => [
				...backgroundColor,
				randomColor,
			]);
		}
	}
	const data = {
		labels: groupName,
		datasets: [
			{
				data: amount,
				backgroundColor: backgroundColor,
				hoverBackgroundColor: backgroundColor,
			},
		],
	};
	return (
		<div class='card'>
			<div class='card-body'>
				<h4 class='card-title'>Group Expense</h4>
				<div
					id='traffic-chart-legend'
					class='rounded-legend legend-vertical legend-bottom-left pt-4'>
					<Doughnut data={data} width={400} height={400} />
				</div>
			</div>
		</div>
	);
}

export default DonutGraph;
