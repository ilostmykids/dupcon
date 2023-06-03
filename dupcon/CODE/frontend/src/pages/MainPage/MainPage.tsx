import React, {useMemo, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { eraseUser } from '../../redux/userSlice'
import { Reminder, useAddReminderMutation, useGetRemindersQuery } from '../../redux/remindersApi'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import reminderCard from '../../components/ReminderCard'
import ReminderCard from '../../components/ReminderCard'
import classes from './MainPage.module.sass'
import Sorter from '../../components/controls/Sorter/CustomCheckbox'
import Filter from '../../components/controls/Filter/Filter'
import CustomCheckbox from '../../components/controls/Sorter/CustomCheckbox'

export type checkboxValues = {label: string, checked: boolean}[]

export const markOptions = [
	{label: "Algorithms", checked: true},
	{label: "Web", checked: true},
	{label: "Data Science", checked: true},
	{label: "Backend", checked: true},
	{label: "Frontend", checked: true},
	{label: "Databases", checked: true}
]

export const languageOptions = ["None", "Python", "C++", "JavaScript", "Java", "C#"]
const languageInitialState = languageOptions.map(elem => ({label: elem, checked: true}))

const MainPage = () => {


	
	const user = useAppSelector(store => store.user)
	const navigate = useNavigate()
	const {data = []} = useGetRemindersQuery(user.uid ? user.uid : '')
	const dispatch = useAppDispatch()

	const sorterOptions = ['Newest', 'Oldest']
	const [sorterValue, setSorterValue] = useState<string>('Newest')

	const [languageFlags, setLangageFlags] = useState<checkboxValues>(languageInitialState)

	

	const [markFlags, setMarkFlags] = useState<checkboxValues>(markOptions)

	const [searchQuery, setSearchQuery] = useState<string>('')

	const handleLanguageChange = (label: string) => {
		setLangageFlags(languageFlags.map(elem => {
			return elem.label === label 
			? {label: elem.label, checked: !elem.checked}
			: elem
		}))
		console.log(languageFlags)
	}
	const handleMarksChange = (label: string) => {
		setMarkFlags(markFlags.map(elem => {
			return elem.label === label 
			? {label: elem.label, checked: !elem.checked}
			: elem
		}))
	}

	const getSortedData = (data: Reminder[]) => {
		if(data.length === 0){
			return []
		}
		const dataForSort = [...data]
		const sortedArr = sorterValue === "Oldest"
		? dataForSort.sort((prev, curr) => parseInt(prev.time) - parseInt(curr.time))
		: dataForSort.sort((prev, curr) => parseInt(curr.time) - parseInt(prev.time))
		return sortedArr
	}

	const getSearchedData = (data: Reminder[]) => {
		if(data.length === 0){
			return []
		}

		const dataForSearch = [...data]
		return dataForSearch.filter(elem => elem.label.toLowerCase().includes(searchQuery.toLowerCase()))
	}

	const getFilteredByLang = (data: Reminder[]) => {
		if(data.length === 0){
			return []
		}

		const checkedLanguages:string[] = []
		for(let i of languageFlags){
			if(i.checked){
				checkedLanguages.push(i.label)
			}
		}

		const dataForFilter = [...data]
		return dataForFilter.filter(elem => checkedLanguages.includes(elem.language))
	}

	const getFilteredByMarks = (data: Reminder[]) => {
		if(data.length === 0){
			return []
		}

		const dataForFilter = [...data]
		const checkedMarks: string[] = []
		for(let i of markFlags){
			if(i.checked){
				checkedMarks.push(i.label)
			}
		}
		return dataForFilter.filter(elem => elem.marks.filter(x => checkedMarks.includes(x)).length !== 0)
	}
	
	let sortedData = useMemo(() => {return getFilteredByMarks(getFilteredByLang(getSearchedData(getSortedData(data))))}, [sorterValue, data, searchQuery, languageFlags, markFlags])


	

  return (

		user.username ? 
			<div className={classes.mainPage}>
				{/* <button onClick={() => dispatch(eraseUser())}>Sign out</button> */}
				<div className={classes.sortingFiltering}>
					<CustomCheckbox 
					label='Sort' 
					options={sorterOptions}
					setValue={setSorterValue}
					value={sorterValue}
					/>
					<Filter 
					label='Languages' 
					onChange={handleLanguageChange}
					value={languageFlags}
					/>
					<Filter
					label='Marks'
					onChange={handleMarksChange}
					value={markFlags}
					/>

				</div>
				<div className={classes.remindersArea}>
					<button className={classes.addButton} onClick={() => navigate('/add')}>Add reminder</button>
					<div className={classes.searchControls}>
						<input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
						<button onClick={() => {}}>Search</button>
					</div>
					<div className={classes.remindersList}>
						{sortedData.map(elem =>  <ReminderCard reminder={elem} key={elem.id}/>)}
					</div>
				</div>

			</div>
		 : <Navigate to='login'/>

  )
}

export default MainPage