import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './../../features/auth/authSlice';
import AuthService from './../../AuthService';

//Import Static Assets
import './Login.css';
import logo from './../../static/img/myExpenseFull.png';

const Login = (props) => {
	const dispatch = useDispatch();
	const [loginUser, setLoginUser] = useState({ username: '', password: '' });
	const [message, setMessage] = useState('');
	const onChangeHandler = (e) => {
		setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
	};
	const formSubmitHandler = (e) => {
		e.preventDefault();
		AuthService.login(loginUser).then((data) => {
			const { isAuthenticated, user, message } = data;
			if (isAuthenticated) {
				dispatch(
					login({
						user,
						isAuthenticated,
					})
				);
				props.history.push('/');
			} else {
				console.log(message);
				setMessage(message);
			}
		});
	};
	return (
		<div className='container-scroller'>
			<div className='container-fluid page-body-wrapper full-page-wrapper'>
				<div className='content-wrapper d-flex align-items-center auth'>
					<div className='row flex-grow'>
						<div className='col-lg-4 mx-auto'>
							<div className='auth-form-light text-left p-5'>
								<div className='brand-logo'>
									<img src={logo} />
								</div>
								<h4>Hello! let's get started</h4>
								<h6 className='font-weight-light'>Sign in to continue.</h6>
								<form onSubmit={formSubmitHandler} className='pt-3'>
									<div className='form-group'>
										<input
											type='text'
											className='form-control form-control-lg'
											placeholder='Username'
											name='username'
											onChange={onChangeHandler}
										/>
									</div>
									<div className='form-group'>
										<input
											type='password'
											className='form-control form-control-lg'
											placeholder='Password'
											name='password'
											onChange={onChangeHandler}
										/>
									</div>
									<div className='mt-3'>
										<button
											className='btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn'
											type='submit'>
											SIGN IN
										</button>
									</div>

									<div className='text-center mt-4 font-weight-light'>
										Don't have an account?&nbsp;
										<Link to='/register' className='text-primary'>
											Create
										</Link>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
