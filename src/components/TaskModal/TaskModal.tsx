import './TaskModal.css'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'
import { useModal } from '../../hooks/useModal'
import { TaskService } from '../../services/taskService'
import { v4 as uuidv4 } from 'uuid'
import { TaskModalForm } from '../TaskModalForm/TaskModalForm'
import { FormEventHandler, useEffect, useState } from 'react'
import { TaskModalItem } from '../TaskModalItems/TaskModalItems'

const taskService = new TaskService()

export const TasksModal = () => {
	const { selectedDay } = useModal()
	const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])
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
		filterTasks && setFilteredTasks(filterTasks)
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

	const handleCheckboxChange = (id: string, completed: boolean) => {
		setFilteredTasks(tasks =>
			tasks.map(task =>
				task.id === id ? { ...task, completed: !completed } : task
			)
		)
		// Здесь также может понадобиться вызвать функцию для обновления задачи в базе данных или в общем состоянии приложения.
	}

	return (
		<section className='modal__wrapper'>
			<div className='modal'>
				<h2 className='modal__heading'>Задачи на день</h2>
				<div className='modal__wrapper-content'>
					<div className='modal__form-content-form'>
						<TaskModalForm
							addTask={handleAddTask}
							formTask={formTask}
							setFormTask={setFormTask}
						/>
						<div className='modal__footer'>
							<button onClick={() => setIsOpen(false)}>Закрыть</button>
						</div>
					</div>
					<div className='modal__content'>
						{filteredTasks && filteredTasks.length ? (
							filteredTasks.map(ft => (
								<TaskModalItem
									key={ft.id}
									task={ft}
									changeCheckbox={() =>
										handleCheckboxChange(ft.id, ft.completed)
									}
								/>
							))
						) : (
							<h4>Not found tasks for this day</h4>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
