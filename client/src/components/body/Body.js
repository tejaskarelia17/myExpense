import React from 'react';

//Import Components
import Header from './../header/Header';
import Sidebar from './../sidebar/Sidebar';
import Main from './../main/Main';

function Body() {
	return (
		<div class='container-scroller'>
			<Header />
			<div class='container-fluid page-body-wrapper'>
				<Sidebar />
				<div class='main-panel'>
					<div class='content-wrapper'>
						<Main />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Body;
