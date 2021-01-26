import React from 'react';

//Import Static Assets
import circleImg from './../../../static/img/circle.svg';

function TopWidget() {
	return (
		<div class='card bg-gradient-danger card-img-holder text-white'>
			<div class='card-body'>
				<img src={circleImg} class='card-img-absolute' alt='circle-image' />
				<h4 class='font-weight-normal mb-3'>
					Weekly Sales <i class='mdi mdi-chart-line mdi-24px float-right'></i>
				</h4>
				<h2 class='mb-5'>$ 15,0000</h2>
				<h6 class='card-text'>Increased by 60%</h6>
			</div>
		</div>
	);
}

export default TopWidget;
