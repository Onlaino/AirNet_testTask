export interface ITasks {
	tasks: ITask[]
}

export interface ITask {
	id: number
	date: string
	title: string
	description: string
	completed: boolean
}
