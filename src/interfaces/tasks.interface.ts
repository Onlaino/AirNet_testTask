export interface ITasks {
	tasks: ITask[]
}

export interface ITask {
	id: string
	date: string
	title: string
	description: string
	completed: boolean
}
