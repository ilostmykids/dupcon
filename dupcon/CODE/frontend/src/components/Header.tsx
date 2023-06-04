import React from 'react'
import classes from './Header.module.sass'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { Link, useNavigate } from 'react-router-dom'
import { eraseUser } from '../redux/userSlice'

const Header = () => {

	const user = useAppSelector(store => store.user)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()


  return (
	<div className={classes.header}>

		<div className={classes.authArea}>
			 {user.username 
			 ? <>
			 <p>{user.username}</p>
			 <button onClick={() => dispatch(eraseUser())}>Sign out</button>
			 </>
			 : <>
			<button onClick={() => navigate('../login')}>Login</button>
			 </>}
		</div>
	</div>
  )
}

export default Header