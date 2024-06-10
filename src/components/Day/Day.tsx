import './Day.css'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'
import { IDayProps } from './Day.props'
import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'

export const Day = ({ date, tasks }: IDayProps) => {
	const { user } = useUser()
	const { setTasks } = useModal()
	const [dayTasks, setDayTasks] = useState<ITask[]>([])

	const calculateClassName = (task: ITask) => {
		const completedClass = 'calendar__cells-cell-tasks-item completed'
		const unCompletedClass = 'calendar__cells-cell-tasks-item'
		return task.completed ? completedClass : unCompletedClass
	}

	useEffect(() => {
		const tasksForDay = tasks.filter(
			task => task.date.split('T')[0] === date.toISOString().split('T')[0]
		)
		setDayTasks(tasksForDay)
	}, [user.tasks, date, tasks, setTasks])

	return (
		<div className='calendar__cells-cell-tasks'>
			{dayTasks.map(t => (
				<div className={calculateClassName(t)} key={t.id}>
					{t.title}
				</div>
			))}
		</div>
	)
}
