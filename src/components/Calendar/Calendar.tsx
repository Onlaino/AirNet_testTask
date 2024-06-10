import './Calendar.css'
import { TasksModal } from '../TaskModal/TaskModal'
import { CalendarCells } from '../CalendarCells/CalendarCells'
import { CalendarHeading } from '../CalendarHeading/CalendarHeading'
import { memo, useState } from 'react'
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays.tsx'

export const Calendar = memo(() => {
	const [date, setDate] = useState<Date>(new Date())

	return (
		<section className='calendar'>
			<TasksModal />
			<CalendarHeading date={date} setDate={setDate} />
			<CalendarWeekdays />
			<CalendarCells date={date} />
		</section>
	)
})
