import { ITask } from '../../interfaces/tasks.interface'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export const TaskModalItem = ({
	task,
	changeCheckbox,
}: {
	task: ITask
	changeCheckbox: (id: string, completed: boolean) => void
}) => {
	return (
		<div className='modal__content-item' key={task.id}>
			<div className='modal__content-item-title'>
				{task.title}
				<input
					type='checkbox'
					checked={task.completed}
					onChange={() => changeCheckbox(task.id, task.completed)}
				/>
				<div>
					<DeleteForeverIcon />
				</div>
			</div>
			<p>{task.description}</p>
		</div>
	)
}