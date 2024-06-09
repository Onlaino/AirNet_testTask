import './TaskModal.css'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'
import { useModal } from '../../hooks/useModal'
import { TaskService } from '../../services/taskService'
import { v4 as uuidv4 } from 'uuid'
import { FormEventHandler, useEffect, useState } from 'react'

const taskService = new TaskService()

export const TasksModal = () => {
	const { selectedDay } = useModal()
	const [filteredTasks, setFilteredTasks] = useState([])
	const [formTask, setFormTask] = useState<ITask>({
		id: '',
		title: '',
		description: '',
		date: '',
		completed: false,
	})
	const { isOpen, setIsOpen, setTasks, tasks } = useModal()
	const { user } = useUser()


	const generateTasksForDay = () => {
		if (selectedDay) {
			return tasks.filter(
				task =>
					task.date.split('T')[0] === selectedDay.toISOString().split('T')[0]
			)
		}
	}
	const filterTasks = generateTasksForDay()

	useEffect(() => {
		setFilteredTasks(filterTasks)
	}, [tasks, selectedDay, setTasks])

	if (!isOpen) return null

	const handleAddTask: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		if (!user.id) {
			alert('Войдите в систему для добавления задач!')
			return
		}
		const newTask = { ...formTask, date: selectedDay, id: uuidv4() }

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
				date: '',
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
					{filteredTasks && filteredTasks.length ? (
						filteredTasks.map(ft => <div key={ft.id}> {ft.title}</div>)
					) : (
						<h4>Not found tasks for this day</h4>
					)}
				</div>
				<div className='modal__footer'>
					<button onClick={() => setIsOpen(false)}>Закрыть</button>
				</div>
			</div>
		</section>
	)
}
