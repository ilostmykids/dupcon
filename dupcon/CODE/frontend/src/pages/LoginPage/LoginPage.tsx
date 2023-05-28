import React from 'react'
import classes from './LoginPage.module.sass'
import Login from '../../components/Login'
import { useNavigate, Navigate} from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks'

const LoginPage = () => {

	const user = useAppSelector(store => store.user)

  return (
		user.uid 
		? <Navigate to='/'/>
		: <div className={classes.loginPage}>
			<Login/>
		  </div>
  )
			
	
  
}

export default LoginPage