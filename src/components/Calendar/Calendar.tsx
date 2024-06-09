import './Calendar.css'
import { months } from '../../utils/calendar.helpers'
import { useModal } from '../../hooks/useModal'
import { WeekDays } from '../WeekDays/WeekDays'
import { TasksModal } from '../TaskModal/TaskModal'
import { useEffect, useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { CalendarCells } from '../CalendarCells/CalendarCells'

export const Calendar = () => {
	const {tasks, setTasks} = useModal();
	const [date, setDate] = useState<Date>(new Date())

	useEffect(() => {}, [tasks, setTasks])

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
			<CalendarCells date={date} />
		</section>
	)
}
