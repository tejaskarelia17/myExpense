import React from 'react';

function DonutGraph() {
	return (
		<div class='card'>
			<div class='card-body'>
				<h4 class='card-title'>Traffic Sources</h4>
				<canvas id='traffic-chart'></canvas>
				<div
					id='traffic-chart-legend'
					class='rounded-legend legend-vertical legend-bottom-left pt-4'></div>
			</div>
		</div>
	);
}

export default DonutGraph;
