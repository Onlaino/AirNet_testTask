import './Calendar.css'
import { useModal } from '../../hooks/useModal'
import { TasksModal } from '../TaskModal/TaskModal'
import { CalendarCells } from '../CalendarCells/CalendarCells'
import { CalendarHeading } from '../CalendarHeading/CalendarHeading'
import { useEffect, useState } from 'react'
import {CalendarWeekdays} from "../CalendarWeekdays/CalendarWeekdays.tsx";

export const Calendar = () => {
	const { tasks, setTasks } = useModal()
	const [date, setDate] = useState<Date>(new Date())

	useEffect(() => {}, [tasks, setTasks])

	return (
		<section className='calendar'>
			<TasksModal />
			<CalendarHeading date={date} setDate={setDate} />
			<CalendarWeekdays />
			<CalendarCells date={date} />
		</section>
	)
}
