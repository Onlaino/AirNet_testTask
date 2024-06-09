import './Day.css'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'
import { IDayProps } from './Day.props'
import { useEffect, useState } from 'react'



export const Day = ({ date, tasks }: IDayProps) => {
	const { user } = useUser()
	const [dayTasks, setDayTasks] = useState<ITask[]>([])

	useEffect(() => {
		const tasksForDay = tasks.filter(
			task => task.date.split('T')[0] === date.toISOString().split('T')[0]
		)
		setDayTasks(tasksForDay)
	}, [user.tasks, date, tasks])

	return (
		<div className='calendar__cells-cell-tasks'>
			{dayTasks.map(t => (
				<div
					className={
						t.completed
							? 'calendar__cells-cell-tasks-item completed'
							: 'calendar__cells-cell-tasks-item'
					}
					key={t.id}
				>
					{t.title}
				</div>
			))}
		</div>
	)
}
