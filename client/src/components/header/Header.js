import React from 'react';
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
	const logoutHandler = () => {
		AuthService.logout().then((data) => {
			if (data.success) {
				dispatch(logout());
			}
		});
	};
	return (
		<div>
			<div className='navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row'>
				<div className='text-center navbar-brand-wrapper d-flex align-items-center justify-content-center'>
					<Link className='navbar-brand brand-logo' href='index.html'>
						<img className='header__logo' src={logo} alt='logo' />
					</Link>
					<Link className='navbar-brand brand-logo-mini' href='index.html'>
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
									<img src={faceImg} alt='image' />
								</div>
								<div className='nav-profile-text'>
									<p className='mb-1 text-black'>David Greymaax</p>
								</div>
							</Link>
						</li>

						<li className='nav-item nav-logout d-none d-lg-block'>
							<Link onClick={logoutHandler} className='nav-link' href='#'>
								<Icon
									path={mdiPower}
									className='sidebar__icons'
									title='Dashboard'
									size={0.8}
								/>
							</Link>
						</li>
						<li className='nav-item nav-settings d-none d-lg-block'>
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
						/>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
