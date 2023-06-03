import React, { FC } from 'react'
import { Reminder } from '../redux/remindersApi'
import classes from './ReminderCard.module.sass'
import {getTimeLabel} from '../utils/timeUtils'
import { useNavigate } from 'react-router-dom'

interface reminderCardProps{
	reminder: Reminder
}

const ReminderCard: FC<reminderCardProps> = ({ reminder }) => {

	const navigate = useNavigate()

  return (
	<div className={classes.reminderCard}>
		<h1 onClick={() => navigate(`/info/${reminder.id}`)}>{reminder.label}</h1>
		<textarea value={reminder.code} disabled></textarea>
		<p className={classes.marks}>Marks: <span className={classes.marksSpan}>{reminder.marks.join(' ')}</span></p>
		<div className={classes.infoLine}>
			<p>Created: <span className={classes.time}>{getTimeLabel(parseInt(reminder.time))}</span></p>
			<p>Language: <span className={classes.language}>{reminder.language}</span></p>
		</div>
	</div>
  )
}

export default ReminderCard