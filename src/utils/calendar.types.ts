import { ITask } from '../interfaces/tasks.interface'

export type TypeCalendarDay = {
	day: number
	inactive?: boolean
	active?: boolean
	tasks?: ITask[]
}
