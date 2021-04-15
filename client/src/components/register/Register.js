import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { register } from './../../features/auth/authSlice';
import AuthService from './../../AuthService';

//Import Static Assets
import './Register.css';
import logo from './../../static/img/myExpenseFull.png';

const Register = (props) => {
	const [registerUser, setRegisterUser] = useState({
		username: '',
		password: '',
		c_password: '',
		name: '',
		email: '',
	});
	let timerID = useRef(null);
	const [message, setMessage] = useState('');
	const onChangeHandler = (e) => {
		setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
	};
	const formSubmitHandler = (e) => {
		e.preventDefault();
		AuthService.register(registerUser).then((data) => {
			const { message } = data;
			setMessage(message);
			if (!message.messageError) {
				Swal.fire('Registered!', message.messageBody, 'success');
				resetForm();
				timerID = setTimeout(() => {
					props.history.push('/');
				}, 1000);
			} else {
				Swal.fire('Ops...', message.messageBody, 'error');
			}
		});
	};

	useEffect(() => {
		return () => {
			clearTimeout(timerID);
		};
	}, []);

	const resetForm = () => {
		setRegisterUser({
			username: '',
			password: '',
			c_password: '',
			name: '',
			email: '',
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
									<img src={logo} alt='logo' />
								</div>
								<h4>Hello! let's get you registered</h4>
								<h6 className='font-weight-light'>
									Please fill in all the fields
								</h6>
								<form onSubmit={formSubmitHandler} className='pt-3'>
									<div className='form-group'>
										<input
											type='text'
											className='form-control form-control-lg'
											name='name'
											onChange={onChangeHandler}
											placeholder='Full Name'
										/>
									</div>
									<div className='form-group'>
										<input
											type='email'
											className='form-control form-control-lg'
											name='email'
											onChange={onChangeHandler}
											placeholder='Email'
										/>
									</div>
									<div className='form-group'>
										<input
											type='text'
											className='form-control form-control-lg'
											name='username'
											onChange={onChangeHandler}
											placeholder='Username'
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
									<div className='form-group'>
										<input
											type='password'
											className='form-control form-control-lg'
											onChange={onChangeHandler}
											name='c_password'
											placeholder='Confirm Password'
										/>
									</div>
									<div className='mt-3'>
										<button
											className='btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn'
											type='submit'>
											REGISTER
										</button>
									</div>

									<div className='text-center mt-4 font-weight-light'>
										Already have an account?&nbsp;
										<Link to='/' className='text-primary'>
											Sign In
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

export default Register;