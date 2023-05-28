import React, { FC } from 'react'
import classes from './ReminderDisplay.module.sass'
import { Reminder } from '../redux/remindersApi'
import { getStandartTime } from '../utils/timeUtils'

interface reminderDisplayProps{
	reminder: Reminder
}

const ReminderDisplay: FC<reminderDisplayProps> = ({reminder}) => {
	console.log(reminder)
  return (
	<div className={classes.reminderDisplay}>
		<div className={classes.labelLine}>
			<h1>Label</h1>
			<p>{reminder.label}</p>
		</div>
		<div className={classes.timeLine}>
			<h1>Create date</h1>
			<p>{getStandartTime(new Date(parseInt(reminder.time)))}</p>
		</div>
		<div className={classes.languageLine}>
			<h1>Language</h1>
			<p>{reminder.language}</p>
		</div>
		<div>
			<h1>Marks</h1>
			<p>{reminder.marks.join(', ')}</p>
		</div>
		<div className={classes.codeLine}>
			<textarea readOnly value={reminder.code}></textarea>
		</div>
	</div>
  )
}

export default ReminderDisplay