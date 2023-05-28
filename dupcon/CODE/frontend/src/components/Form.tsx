import React, { FC, useState } from 'react'
import classes from './Form.module.sass'
import CustomInput from './CustomInput'

interface formProps{
	onSubmit: (email: string, pass: string) => void
	variant: "Register" | "Login"
}

const Form:FC<formProps> = ({onSubmit, variant}) => {

	const [email, setEmail] = useState<string>('')
	const [pass, setPass] = useState<string>('')
	const [secondPass, setSecondPass] = useState<string>('')

	const handleAccept = () => {
		if(pass === secondPass || variant === 'Login'){
			onSubmit(email, pass)
		}
	}

  return (
	<div className={classes.customForm}>
		<div className={classes.inputArea}>
			<p>Email address</p>
			<CustomInput onChange={setEmail} type='email' value={email}/>
		</div>
		<div className={classes.inputArea}>
			<p>Password</p>
			<CustomInput onChange={setPass} type='password' value={pass}/>
		</div>
		{variant === 'Register' 
		? <div className={classes.inputArea}>
			<p>Confirm password</p>
			<CustomInput onChange={setSecondPass} type='password' value={secondPass}/>
		</div>
		: null	
		}
		<button onClick={() => handleAccept()}>{variant}</button>

	</div>
  )
}

export default Form