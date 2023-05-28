import React from 'react'
import classes from "./Register.module.sass"
import Form from './Form'
import { useAppDispatch } from '../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { UserCredential, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setUser } from '../redux/userSlice'

const Register = () => {

	const dispatch = useAppDispatch()
	const auth = getAuth()
	const navigate = useNavigate()

	const handleAnswer = (response: UserCredential) => {
		dispatch(setUser({
			username: response.user.email,
			uid: response.user.uid,
			token: response.user.refreshToken
		}));
		navigate('/');
	}

	const registerHandler = (email: string, pass: string) => {
		createUserWithEmailAndPassword(auth, email, pass)
			.then(response => handleAnswer(response))
			.catch(error => console.log(error))
	}

  return (
	<div className={classes.register}>
		<Form variant='Register' onSubmit={registerHandler}/>
	</div>
  )
}

export default Register