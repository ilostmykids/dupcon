import React from 'react'
import classes from './RegisterPage.module.sass'
import Register from '../../components/Register'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const RegisterPage = () => {

	const user = useAppSelector(store => store.user)

  return (
	user.username 
	? <Navigate to='/'/>
	: (<div className={classes.registerPage}>
		<Register/>
	  </div>)
  )
}

export default RegisterPage