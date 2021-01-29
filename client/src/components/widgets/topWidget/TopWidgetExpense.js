import React from 'react';
import CurrencyFormat from 'react-currency-format';
import Icon from '@mdi/react';

//Import Static Assets
import circleImg from './../../../static/img/circle.svg';

function TopWidgetExpense({ title, value, icon, cardClass }) {
	return (
		<div class={cardClass}>
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

				<CurrencyFormat
					renderText={(value) => <h2 class='mb-5'>{value}</h2>}
					decimalScale={2}
					value={value}
					displayType='text'
					thousandSeparator={true}
					prefix={'$'}
				/>
				{/* <h6 class='card-text'>Increased by 60%</h6> */}
			</div>
		</div>
	);
}

export default TopWidgetExpense;
