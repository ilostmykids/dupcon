import React, { FC } from 'react'
import classes from './Filter.module.sass'

interface filterProps{
	onChange: (label: string) => void
	label: string
	value: {label: string, checked: boolean}[]
}

const Filter: FC<filterProps> = ({label, onChange, value}) => {
  return (
	<div className={classes.filter}>
		<h1>{label}</h1>
		{value.map((elem, index) => 
			<div className={classes.filterOption}>
				<input 
				type="checkbox" 
				key={elem.label}
				onChange={() => onChange(elem.label)}
				checked={value[index].checked}
				id={elem.label}
				/>
				<label htmlFor={elem.label}>{elem.label}</label>
			</div>
		)}
	</div>
  )
}

export default Filter