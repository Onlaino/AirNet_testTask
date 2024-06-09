import { useEffect, useState } from 'react'
import './Day.css'
import { useUser } from '../../hooks/useUserContext'

export const Day = ({ date, tasks }) => {
	const { user } = useUser()
	const [dayTasks, setDayTasks] = useState([])

	useEffect(() => {
		const tasksForDay = tasks.filter(
			task => task.date.split('T')[0] === date.toISOString().split('T')[0]
		)
		setDayTasks(tasksForDay)
	}, [user.tasks, date, tasks])

	return (
		<div className='calendar__cells-cell-tasks-length'>
			{dayTasks.map(t => (
				<div key={t.id}>{t.title}</div>
			))}
		</div>
	)
}
