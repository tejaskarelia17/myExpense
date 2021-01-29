import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiPower } from '@mdi/js';
import { mdiMenu } from '@mdi/js';
import { useSelector, useDispatch } from 'react-redux';
import {
	logout,
	selectUser,
	selectIsAuthenticated,
} from './../../features/auth/authSlice';
import AuthService from './../../AuthService';

//Import Static Assets
import faceImg from '../../static/img/face1.jpg';
import logoIcon from './../../static/img/myExpense.png';
import logo from './../../static/img/myExpenseFull.png';

function Header() {
	const dispatch = useDispatch();
	const [desktopIcon, setDesktopIcon] = useState('');
	const [mobileIcon, setMobileIcon] = useState('sidebar sidebar-offcanvas');
	const user = useSelector(selectUser);
	const logoutHandler = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				dispatch(logout());
			}
		});
	};
	const desktopIconOnly = () => {
		{
			desktopIcon === ''
				? setDesktopIcon('sidebar-icon-only')
				: setDesktopIcon('');
		}
		document.body.className = desktopIcon;
	};
	const mobileSidebar = () => {
		{
			mobileIcon === 'sidebar sidebar-offcanvas'
				? setMobileIcon('sidebar sidebar-offcanvas active')
				: setMobileIcon('sidebar sidebar-offcanvas');
		}
		document.getElementById('sidebarIcons').className = mobileIcon;
	};
	return (
		<div>
			<div className='navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
				<div className='text-center navbar-brand-wrapper d-flex align-items-center justify-content-center'>
					<Link className='navbar-brand brand-logo' to='/'>
						<img className='header__logo' src={logo} alt='logo' />
					</Link>
					<Link className='navbar-brand brand-logo-mini' to='/'>
						<img className='header__logo' src={logoIcon} alt='logo' />
					</Link>
				</div>
				<div className='navbar-menu-wrapper d-flex align-items-stretch'>
					<button
						className='navbar-toggler navbar-toggler align-self-center'
						type='button'
						data-toggle='minimize'>
						<Icon
							path={mdiMenu}
							className='sidebar__icons'
							onClick={desktopIconOnly}
							title='Menu'
							size={0.8}
						/>
					</button>
					<ul className='navbar-nav navbar-nav-right'>
						<li className='nav-item nav-profile dropdown'>
							<Link
								className='nav-link'
								id='profileDropdown'
								href='#'
								aria-expanded='false'>
								<div className='nav-profile-img'>
									<img src={faceImg} alt='users profile' />
								</div>
								<div className='nav-profile-text'>
									<p className='mb-1 text-black'>{user.name}</p>
								</div>
							</Link>
						</li>

						<li className='nav-item nav-logout d-block'>
							<Link onClick={logoutHandler} className='nav-link' href='#'>
								<Icon
									path={mdiPower}
									className='sidebar__icons'
									title='Dashboard'
									size={0.8}
								/>
							</Link>
						</li>
						<li className='nav-item nav-settings d-none'>
							<Link className='nav-link' href='#'>
								<Icon
									path={mdiMenu}
									className='sidebar__icons'
									title='Menu'
									size={0.8}
								/>
							</Link>
						</li>
					</ul>
					<button
						className='navbar-toggler navbar-toggler-right d-lg-none align-self-center'
						type='button'
						data-toggle='offcanvas'>
						<Icon
							path={mdiMenu}
							className='sidebar__icons'
							title='Dashboard'
							size={0.8}
							onClick={mobileSidebar}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
