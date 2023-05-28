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
	<div className={classes.reminderCard} onClick={() => navigate(`/info/${reminder.id}`)} style={{display: 'flex', border: '1px solid black', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
		<h1>{reminder.label}</h1>
		<textarea value={reminder.code}></textarea>
		<p>{reminder.marks.join(' ')}</p>
		<div className={classes.infoLine}>
			<p>{getTimeLabel(parseInt(reminder.time))}</p>
			<p>{reminder.language}</p>
		</div>
	</div>
  )
}

export default ReminderCard