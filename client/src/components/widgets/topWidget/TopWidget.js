import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Icon from '@mdi/react';
import { mdiChartLine } from '@mdi/js';

//Import Static Assets
import circleImg from './../../../static/img/circle.svg';

function TopWidget({ title, value, icon, subValue }) {
	return (
		<div class='card bg-gradient-danger card-img-holder text-white'>
			<div class='card-body'>
				<img src={circleImg} class='card-img-absolute' alt='circle-image' />
				<h4 class='font-weight-normal mb-3'>
					{title}
					<Icon
						className='title__icon float-right'
						path={icon}
						title='Chart'
						size={0.8}
					/>
				</h4>
				{subValue ? (
					<>
						<h2 class='mb-5'>{subValue}</h2>
						<CurrencyFormat
							renderText={(value) => <h6 class='card-text'>{value} </h6>}
							decimalScale={2}
							value={value}
							displayType='text'
							thousandSeparator={true}
							prefix={'$'}
						/>
					</>
				) : (
					<CurrencyFormat
						renderText={(value) => <h2 class='mb-5'>{value}</h2>}
						decimalScale={2}
						value={value}
						displayType='text'
						thousandSeparator={true}
						prefix={'$'}
					/>
				)}
			</div>
		</div>
	);
}

export default TopWidget;
