import React from 'react'
import classes from "./Login.module.sass"
import Form from './Form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/reduxHooks'
import { UserCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from '../redux/userSlice'
import { error } from 'console'

const Login = () => {

	const dispatch = useAppDispatch()
	const auth = getAuth()
	const navigate = useNavigate()

	const handleAnswer = (response: UserCredential) => {
		dispatch(setUser({
			username: response.user.email,
			uid: response.user.uid,
			token: response.user.refreshToken
		}));
		navigate('../main');
	}

	const loginHandler = (email: string, pass: string) => {
		signInWithEmailAndPassword(auth, email, pass)
		.then(response => handleAnswer(response)
		)
		.catch(error => console.log(error))
	}

  return (
	<div className={classes.login}>
		<h1>Login</h1>
		<Form onSubmit={loginHandler} variant='Login'/>
		<div className={classes.redirect}>
			New to site? <Link to='../register' className={classes.link}> Create an account</Link>
		</div>
	</div>
  )
}

export default Login