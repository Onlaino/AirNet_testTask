import { ITask } from '../interfaces/tasks.interface'


export const generateCalendar = (date: Date, tasks: ITask[]) => {
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
			tasks: tasks,
		})
	}

	for (let i = 1; i <= lastDateOfMonth; i++) {
		const isToday =
			i === date.getDate() &&
			month === new Date().getMonth() &&
			year === new Date().getFullYear()
		calendarDays.push({
			day: new Date(year, month, i),
			active: isToday,
			tasks: tasks,
		})
	}

	const daysToAdd = 6 - (lastDayOfMonth === 0 ? 6 : lastDayOfMonth)
	for (let i = 1; i <= daysToAdd; i++) {
		calendarDays.push({
			day: new Date(year, month + 1, i),
			inactive: true,
			tasks: tasks,
		})
	}
	return calendarDays
}
