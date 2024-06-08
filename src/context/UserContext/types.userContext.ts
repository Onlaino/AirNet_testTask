import { ITask } from '../../interfaces/tasks.interface'

export type UserType = {
	name?: string
	id: string
	tasks: ITask[]
}

export type TypeUserContext = {
	user: UserType
	login: (name: string, userId: string) => void
	logout: () => void
}
