import React, {FC} from 'react'
import classes from "./CustomInput.module.sass"

interface customInputProps{
	type: string,
	value: any,
	onChange: any
}

const CustomInput:FC<customInputProps> = ({type, value, onChange}) => {
  return (
	<input className={classes.customInput} type={type} value={value} onChange={(event) => onChange(event.target.value)}/>
  )
}

export default CustomInput