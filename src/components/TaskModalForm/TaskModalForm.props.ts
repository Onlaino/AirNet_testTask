import { DetailedHTMLProps, FormEventHandler, HTMLAttributes } from 'react'
import { ITask } from '../../interfaces/tasks.interface'

export interface ITaskModalFormProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	addTask: FormEventHandler<HTMLFormElement>
	formTask: ITask
	setFormTask: (obj: ITask) => void
}
