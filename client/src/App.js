import React, { useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from './features/auth/authSlice';

//Import Components
import Login from './components/login/Login';
import Register from './components/register/Register';
import Body from './components/body/Body';
import Group from './components/group/Group';
import Transaction from './components/transaction/Transaction';
import AddTransaction from './components/addTransaction/AddTransaction';
import Recycle from './components/recycle/Recycle';

//Import Static Assets
import './App.css';

function App() {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const unauthenticatedPage = () => {
		return (
			<>
				<Redirect to='/' />
				<Route exact path='/' component={Login} />
				<Route exact path='/register' component={Register} />
			</>
		);
	};
	const authenticatedPage = () => {
		return (
			<>
				<Route exact path='/group' component={Group} />
				<Route exact path='/transaction'>
					<Transaction />
				</Route>
				<Route exact path='/recycle'>
					<Recycle />
				</Route>
				<Route exact path='/addtransaction'>
					<AddTransaction />
				</Route>
				<Route exact path='/'>
					<Body />
				</Route>
			</>
		);
	};
	return (
		<Router>
			<div className='app'>
				<Switch>
					{isAuthenticated ? authenticatedPage() : unauthenticatedPage()}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
