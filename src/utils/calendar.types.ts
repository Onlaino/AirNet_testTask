import { ITask } from '../interfaces/tasks.interface'

export type TypeCalendarDay = {
	day: Date
	inactive?: boolean
	active?: boolean
	tasks?: ITask[]
}
