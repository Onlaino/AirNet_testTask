import './Calendar.css'
import { months } from '../../utils/calendar.helpers'
import { useModal } from '../../hooks/useModal'
import { WeekDays } from '../WeekDays/WeekDays'
import { TasksModal } from '../TaskModal/TaskModal'
import { TypeCalendarDay } from '../../utils/calendar.types'
import { useEffect, useState } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useUser } from '../../hooks/useUserContext'
import { ITask } from '../../interfaces/tasks.interface'

export const Calendar = () => {
	const { setIsOpen, setSelectedDay } = useModal()
	const { user } = useUser()
	const [date, setDate] = useState<Date>(new Date())
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([])

	useEffect(() => {
		const calendarDays = generateCalendar()
		setCalendar(calendarDays)
	}, [date])

	const generateCalendar = () => {
		const year = date.getFullYear()
		const month = date.getMonth()
		let firstDayOfMonth = new Date(year, month, 1).getDay()
		firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
		const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
		const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay()
		const lastDateOfPreviousMonth = new Date(year, month, 0).getDate()

		const calendarDays = []

		for (let i = firstDayOfMonth; i > 0; i--) {
			calendarDays.push({
				day: new Date(year, month - 1, lastDateOfPreviousMonth - i + 1),
				inactive: true,
				tasks: user.tasks,
			})
		}

		// Дни текущего месяца
		for (let i = 1; i <= lastDateOfMonth; i++) {
			const isToday =
				i === date.getDate() &&
				month === new Date().getMonth() &&
				year === new Date().getFullYear()
			calendarDays.push({
				day: new Date(year, month, i),
				active: isToday,
				tasks: user.tasks,
			})
		}

		// Дни следующего месяца
		const daysToAdd = 6 - (lastDayOfMonth === 0 ? 6 : lastDayOfMonth)
		for (let i = 1; i <= daysToAdd; i++) {
			calendarDays.push({
				day: new Date(year, month + 1, i),
				inactive: true,
				tasks: user.tasks,
			})
		}

		return calendarDays
	}

	// calendar Date Mon May 27 2024 00:00:00 GMT+0300 (Moscow Standard Time)
	// user.tasks 6/8/2024, 10:59:45 PM

	const handleDayClick = async (calendarDay: TypeCalendarDay) => {
		const nowSelectedDay = new Date(
			date.getFullYear(),
			date.getMonth(),
			calendarDay.day
		)
		setSelectedDay(nowSelectedDay)
		setIsOpen(true)
	}

	return (
		<section className='calendar'>
			<TasksModal />
			<header className='calendar__heading'>
				<button
					className='calendar__heading-button'
					onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
				>
					<ArrowBackIosIcon />
				</button>
				<button
					className='calendar__heading-button'
					onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
				>
					<ArrowForwardIosIcon />
				</button>
				{months[date.getMonth()]} {date.getFullYear()}
			</header>
			<WeekDays />
			<ul className='calendar__cells'>
				{calendar.map((item, index) => (
					<li
						onClick={() => handleDayClick(item)}
						key={index}
						className={`calendar__cells-cell ${
							item.inactive ? 'inactive' : ''
						} ${item.active ? 'active' : ''}`}
					>
						<span className='calendar__cells-cell-day'>
							{item.day.toLocaleString().split(',')[0].split('/')[1]}
						</span>
						<div className='calendar__cells-cell-tasks'>
							{user.tasks
								.filter(
									task =>
										task.date.toLocaleString().split(',')[0].split('/')[1] ===
										item.day.toLocaleString().split(',')[0].split('/')[1]
								)
								.map(task => (
									<div key={task.id}>{task.title}</div>
								))}
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
