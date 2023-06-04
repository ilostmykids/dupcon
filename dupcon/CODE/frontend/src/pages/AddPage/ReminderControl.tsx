import React, { ChangeEvent, useState, FC } from 'react'
import { Reminder, useAddReminderMutation, useGetReminderQuery, useUpdateReminderMutation } from '../../redux/remindersApi'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './ReminderControl.module.sass'
import { checkboxValues } from '../MainPage/MainPage'
import { nanoid } from '@reduxjs/toolkit'
import { useAppSelector } from '../../hooks/reduxHooks'
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/dist/query'
import CustomInput from '../../components/CustomInput'

interface addReminderPageProps{
  languageOptions: string[]
  markOptions: checkboxValues
  type: 'add' | 'edit'
  initialValue?: Reminder
}

const ReminderControl:FC<addReminderPageProps> = ({languageOptions, markOptions, type}) => {


  const { id } = useParams<{id: string}>()
  const { data } = useGetReminderQuery(id ? id : '')
  const [updateReminder, {}] = useUpdateReminderMutation()

  const [addReminder, {}] = useAddReminderMutation()
  const navigate = useNavigate()
  const userId = useAppSelector(store => store.user.uid)

  const [labelValue, setLabelValue] = useState<string>(data ? data.label : '')
  const [languageValue, setLanguageValue] = useState<string>(data ? data.language : 'None')
  const [codeValue, setCodeValue] = useState<string>(data ? data.code : '')
  const [marksValue, setMarksValue] = useState<string[]>(data ? data.marks : [])


  const handleMarksChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(marksValue)
    console.log(event.target.value)
    if(marksValue.includes(event.target.value)){
      setMarksValue(marksValue.filter(elem => elem !== event.target.value))
    }else{
      setMarksValue([...marksValue, event.target.value])
    }
  }

  const handleSaveClick = async () => {
    const time = new Date().getTime().toString()
    const data = new FormData()
    data.append('id', nanoid())
    data.append('uid', userId ? userId : '')
    data.append('label', labelValue ? labelValue : 'Unnamed reminder')
    data.append('marks', marksValue.join('&'))
    data.append('time', time)
    data.append('language', languageValue)
    data.append('code', codeValue)
    await addReminder(data).unwrap()

    navigate(-1)
  }

  const handeEditClick = async (id: string, label: string, marks: string[], language: string, code: string) => {
    const data = {
      id,
      label,
      marks: marks.join('&'),
      language,
      code
    }

    await updateReminder(data)
    .unwrap()
    

    navigate('../main')
    
  }


  return (
	<div className={classes.reminderControlPage}>
    <div className={classes.reminderControl}>
      <div className={classes.labelLine}>
        <h1>Label</h1>
        <input
        type='text'
        value={labelValue} 
        onChange={(event: ChangeEvent<HTMLInputElement>) => setLabelValue(event.target.value)}
        />
      </div>
      <div className={classes.languageLine}>
        <h1>Language</h1>
        <select name="language" id="language" onChange={event => setLanguageValue(event.target.value)}>
          {languageOptions.map(option => <option value={option}>{option}</option>)}
        </select>
      </div>
      <div className={classes.marksLine}>
        <h1>Marks</h1>
        {markOptions.map(option => <>
        <input 
        type='checkbox' 
        id={option.label} 
        checked={marksValue.includes(option.label)}
        onChange={event => handleMarksChange(event)}
        value={option.label}
        ></input>
        <label htmlFor={option.label}>{option.label}</label>
        </>
        )}
      </div>
      <div className={classes.codeLine}>
          <textarea 
          value={codeValue} 
          onChange={event => setCodeValue(event.target.value)}></textarea>
      </div>
      <div>
        {type === 'edit' ? <button className={classes.acceptButton} onClick={() => handeEditClick(id ? id : ' ', labelValue, marksValue, languageValue, codeValue)}>Save</button> : <button className={classes.acceptButton} onClick={() => handleSaveClick()}>Add</button>}
      </div>
    </div>
  </div>
  )
}

export default ReminderControl