import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';
import { mdiClipboardMultiple } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import { mdiLogout } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import {
	logout,
	selectUser,
	selectIsAuthenticated,
} from './../../features/auth/authSlice';
import AuthService from './../../AuthService';

function Sidebar() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				dispatch(logout());
			}
		});
	};
	return (
		<nav class='sidebar sidebar-offcanvas' id='sidebarIcons'>
			<ul class='nav'>
				<li class='nav-item nav__firstIcon '>
					<Link
						class='nav-link'
						data-toggle='collapse'
						to='/'
						aria-expanded='false'
						aria-controls='ui-basic'>
						<span class='menu-title'>Dashboard</span>
						<Icon
							path={mdiHome}
							className='sidebar__icons'
							title='Dashboard'
							size={0.8}
						/>
					</Link>
				</li>
				<li class='nav-item'>
					<Link
						class='nav-link'
						data-toggle='collapse'
						to='/group'
						aria-expanded='false'
						aria-controls='ui-basic'>
						<span class='menu-title'>Groups</span>
						<Icon
							path={mdiClipboardMultiple}
							className='sidebar__icons'
							title='Groups'
							size={0.8}
						/>
					</Link>
				</li>
				<li class='nav-item'>
					<Link class='nav-link' to='/recycle'>
						<span class='menu-title'>Trash</span>
						<Icon
							path={mdiDelete}
							className='sidebar__icons'
							title='Recycle bin'
							size={0.8}
						/>
					</Link>
				</li>
				<li class='nav-item'>
					<Link class='nav-link' onClick={logoutHandler}>
						<span class='menu-title'>Logout</span>
						<Icon
							path={mdiLogout}
							className='sidebar__icons'
							title='Logout'
							size={0.8}
						/>
					</Link>
				</li>

				<li class='nav-item sidebar-actions'>
					<span class='nav-link'>
						<Link
							to='/addtransaction'
							class='btn btn-block btn-lg btn-gradient-primary mt-4'>
							+ Add a Bill
						</Link>
					</span>
				</li>
			</ul>
		</nav>
	);
}

export default Sidebar;
