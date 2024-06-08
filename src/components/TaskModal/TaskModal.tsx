import './TaskModal.css'
import { useModal } from '../../hooks/useModal'
import { FormEventHandler, useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUserContext'
import { TaskService } from '../../services/taskService'
import { ITask } from '../../interfaces/tasks.interface'
import { v4 as uuidv4 } from 'uuid'

const taskService = new TaskService()

export const TasksModal = () => {
	const [formTask, setFormTask] = useState<ITask>({
		id: '',
		title: '',
		description: '',
		date: new Date().toLocaleString(),
		completed: false,
	})
	const { isOpen, setIsOpen, setTasks, tasks } = useModal()
	// tasks
	const { user } = useUser()


	useEffect(() => {}, [tasks])

	if (!isOpen) return null

	const handleAddTask: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!user.id) {
			alert('Войдите в систему для добавления задач!')
			return
		}
		const newTask = { ...formTask, id: uuidv4() }

		try {
			const userWithAddedTask = await taskService.addTaskByUserId(
				user.id,
				newTask
			)
			const taskToAdd =
				userWithAddedTask.tasks[userWithAddedTask.tasks.length - 1]

			setTasks(prev => [...prev, taskToAdd])
			setFormTask({
				id: '',
				title: '',
				description: '',
				date: new Date().toLocaleString(),
				completed: false,
			})
		} catch (error) {
			console.error('Failed to add task:', error)
		}
	}

	return (
		<section className='modal__wrapper'>
			<div className='modal'>
				<h2 className='modal__heading'>Задачи на день</h2>
				<form className='modal__form' onSubmit={handleAddTask}>
					<label htmlFor='task'>Create task</label>
					<input
						className='modal__form-input'
						value={formTask.title}
						onChange={e => setFormTask({ ...formTask, title: e.target.value })}
						type='text'
						name='task'
						placeholder='Заголовок задачи'
					/>
					<textarea
						className='modal__form-textarea'
						name=''
						id=''
						placeholder='Что нужно сделать'
						value={formTask.description}
						onChange={e =>
							setFormTask({ ...formTask, description: e.target.value })
						}
					></textarea>
					<button>Add task</button>
				</form>
				<div className='modal__content'>
					{tasks.map(t => (
						<div key={t.id}>
							<div>{t.title}</div>
							<div>{t.description}</div>
						</div>
					))}
				</div>
				<div className='modal__footer'>
					<button onClick={() => setIsOpen(false)}>Закрыть</button>
				</div>
			</div>
		</section>
	)
}
