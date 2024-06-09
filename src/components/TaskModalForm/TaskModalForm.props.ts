import { DetailedHTMLProps, FormEventHandler, HTMLAttributes } from 'react'
import { ITask } from '../../interfaces/tasks.interface'

export interface ITaskModalFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	addTask: FormEventHandler<HTMLFormElement>
	deleteTask: (userId: string, taskId: string) => void
	formTask: ITask
	setFormTask: (obj: ITask) => void
}
