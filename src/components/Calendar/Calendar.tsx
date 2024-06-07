import './Calendar.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useEffect, useState } from 'react'
import { months, weekdays } from '../../utils/calendar.helpers'
import { TypeCalendarDay } from '../../utils/calendar.types'

export const Calendar = () => {
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
				day: lastDateOfPreviousMonth - i + 1,
				inactive: true,
			})
		}

		for (let i = 1; i <= lastDateOfMonth; i++) {
			const isToday =
				i === date.getDate() &&
				month === new Date().getMonth() &&
				year === new Date().getFullYear()
			calendarDays.push({ day: i, active: isToday })
		}

		const lastDayIndex = (lastDayOfMonth === 0 ? 7 : lastDayOfMonth) - 1
		for (let i = lastDayOfMonth; i <= 6 - lastDayIndex; i++) {
			calendarDays.push({ day: i - lastDayOfMonth + 1, inactive: true })
		}

		return calendarDays;
	}

	return (
		<section className='calendar'>
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
			<ul className='calendar__weekdays'>
				{weekdays.map((wd, i) => (
					<li key={i} className='calendar__weekdays-day'>
						{wd}
					</li>
				))}
			</ul>
			<ul className='calendar__cells'>
				{calendar.map((item, index) => (
					<li key={index} className={`calendar__cells-cell `}>
						<span
							className={`calendar__cells-cell-day ${
								item.inactive ? 'inactive' : ''
							} ${item.active ? 'active' : ''}`}
						>
							{item.day}
						</span>
					</li>
				))}
			</ul>
		</section>
	)
}