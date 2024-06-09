import { Day } from '../Day/Day'
import { useUser } from '../../hooks/useUserContext'
import { useModal } from '../../hooks/useModal'
import { TypeCalendarDay } from '../../utils/calendar.types'
import { generateCalendar } from '../../utils/generateCalendar'
import { useEffect, useState } from 'react'

export const CalendarCells = ({ date }: { date: Date }) => {
	const { user } = useUser()
	const [calendar, setCalendar] = useState<TypeCalendarDay[]>([])
	const { setTasks, setIsOpen, setSelectedDay, tasks } = useModal()

	const handleDayClick = async (calendarDay: TypeCalendarDay) => {
		setSelectedDay(calendarDay.day)
		setIsOpen(true)
	}

	useEffect(() => {
		const calendarDays = generateCalendar(date, user.tasks)
		setCalendar(calendarDays)
	}, [date, tasks, setTasks])

	return (
		<ul className='calendar__cells'>
			{calendar.map((item, index) => (
				<li
					onClick={() => handleDayClick(item)}
					key={index}
					className={`calendar__cells-cell ${item.inactive ? 'inactive' : ''} ${
						item.active ? 'active' : ''
					}`}
				>
					<span className='calendar__cells-cell-day'>
						{item.day.toLocaleString().split(',')[0].split('/')[1]}
					</span>
					<div className='calendar__cells-cell-tasks'>
						<Day tasks={tasks} date={item.day} />
					</div>
				</li>
			))}
		</ul>
	)
}
