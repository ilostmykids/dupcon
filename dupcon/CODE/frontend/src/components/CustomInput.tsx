import React, {FC} from 'react'
import classes from "./CustomInput.module.sass"

interface customInputProps{
	type: string,
	value: any,
	onChange: any
	id?: string
}

const CustomInput:FC<customInputProps> = ({type, value, onChange, id}) => {
  return (
	<input 
	className={classes.customInput} 
	type={type} 
	value={value} 
	onChange={(event) => onChange(event.target.value)}
	id={id ? id : ''}
	/>
  )
}

export default CustomInput