import React, {FC} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteReminderMutation, useGetReminderQuery, useGetRemindersQuery } from '../../redux/remindersApi'
import { useAppSelector } from '../../hooks/reduxHooks'
import classes from './ReminderPage.module.sass'
import ReminderDisplay from '../../components/ReminderDisplay'

const ReminderPage: FC = () => {

  const user = useAppSelector(store => store.user)
  const [deleteReminder, ] = useDeleteReminderMutation()
  const navigate = useNavigate()
  const { id } = useParams<{id: string}>()
  // const {data = []} = useGetRemindersQuery(user.uid ? user.uid : '')
  const { data } = useGetReminderQuery(id ? id : '')
  
  console.log(data)
  console.log(id)
  console.log(data?.marks)

  const handleDeleteClick = () => {
    deleteReminder(data?.id)
    navigate(-1)
  }

  return (

    data 
    ? <div className={classes.reminderPage}>
        <div className={classes.controlLine}>
          <div className={classes.firstControls}>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate(`../edit/${data?.id}`)}>Edit</button>
          </div>
          <button onClick={() => handleDeleteClick()} className={classes.deleteButton}>Delete</button>
        </div>
        <ReminderDisplay reminder={data}/>
    </div>

    : <div>kek</div>
  
  )
}

export default ReminderPage