import React, { FC } from 'react'
import classes from './CustomCheckbox.module.sass'

interface customCheckboxProps{
	label: string
	options: string[]
	setValue: (value: string) => void
	value: string
}

const CustomCheckbox:FC<customCheckboxProps> = ({label, options, setValue, value}) => {
  return (
	<div className={classes.sorter}>
		<h1>{label}</h1>

		<div className={classes.options}>
			{options.map(option => 
			<div className={classes.option}>
				<input
				type='radio'
				className={classes.radio}
				checked={option === value}
				value={option}
				onChange={(event) => setValue(event.target.value)}
				key={option}
				id={option}
				/>
				<label htmlFor={option}>{option}</label>
			</div>)}
		</div>
	</div>
  )
}

export default CustomCheckbox