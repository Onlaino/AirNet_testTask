import './TaskModalItems.css'
import { ITask } from '../../interfaces/tasks.interface'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const TaskModalItem = ({
	task,
	changeCheckbox,
	deleteTask,
}: {
	task: ITask
	changeCheckbox: (id: string, completed: boolean) => void
	deleteTask: () => void
}) => {
	const calculateTitleClassName = (task: ITask) => {
		const completedClass = 'modal__content-item-title completed'
		const unCompletedClass = 'modal__content-item-title'
		return task.completed ? completedClass : unCompletedClass
	}

	return (
		<div className='modal__content-item' key={task.id}>
			<div className={calculateTitleClassName(task)}>
				<p>{task.title}</p>
				<div className='modal__content-item-icons'>
					<input
						type='checkbox'
						checked={task.completed}
						onChange={() => changeCheckbox(task.id, task.completed)}
					/>
					<div className='modal__content-item-delete' onClick={deleteTask}>
						<DeleteForeverIcon />
					</div>
				</div>
			</div>
			<p>{task.description}</p>
		</div>
	)
}
