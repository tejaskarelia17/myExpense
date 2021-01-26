import React from 'react';

function BarGraph() {
	return (
		<div class='card'>
			<div class='card-body'>
				<div class='clearfix'>
					<h4 class='card-title float-left'>Visit And Sales Statistics</h4>
					<div
						id='visit-sale-chart-legend'
						class='rounded-legend legend-horizontal legend-top-right float-right'></div>
				</div>
				<canvas id='visit-sale-chart' class='mt-4'></canvas>
			</div>
		</div>
	);
}

export default BarGraph;
