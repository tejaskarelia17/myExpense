import React from 'react';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

//Import Components
import TopWidget from './../widgets/topWidget/TopWidget';
import BarGraph from './../graphs/BarGraph';
import DonutGraph from './../graphs/DonutGraph';
import Tables from './../tables/Tables';

//Import Static Assets

function Main() {
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
					<TopWidget />
				</div>
				<div class='col-md-4 stretch-card grid-margin'>
					<TopWidget />
				</div>
				<div class='col-md-4 stretch-card grid-margin'>
					<TopWidget />
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
