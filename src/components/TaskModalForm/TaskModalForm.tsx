import './TaskModalForm.css'
import { ITaskModalFormProps } from './TaskModalForm.props'

export const TaskModalForm = ({
	addTask,
	formTask,
	setFormTask,
}: ITaskModalFormProps) => {
	return (
		<form className='modal__form' onSubmit={addTask}>
			<div className='modal__form-title'>
				<label htmlFor='task'>Create title</label>
				<input
					required
					className='modal__form-input'
					value={formTask.title}
					onChange={e => setFormTask({ ...formTask, title: e.target.value })}
					type='text'
					name='task'
					placeholder='Заголовок задачи'
				/>
			</div>
			<div className='modal__form-title'>
				<label htmlFor='descr'>Add task description</label>
				<textarea
					className='modal__form-textarea'
					name='descr'
					id=''
					placeholder='Что нужно сделать'
					value={formTask.description}
					onChange={e =>
						setFormTask({ ...formTask, description: e.target.value })
					}
				></textarea>
			</div>
			<button className='modal__form-button'>Add task</button>
		</form>
	)
}
