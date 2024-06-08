import { ITask } from '../interfaces/tasks.interface'
import { IUser } from '../interfaces/user.interface'

export class TaskService {
	private readonly BASE_URL = 'http://localhost:3000/users'

	async fetchTasksByUserId(id: string): Promise<IUser> {
		try {
			const res = await fetch(`${this.BASE_URL}/${id}`)
			const data = await res.json()
			return data
		} catch (error) {
			return Promise.reject()
		}
	}

	async addTaskByUserId(userId: string, newTask: ITask) {
		try {
			const userResponse = await fetch(`${this.BASE_URL}/${userId}`)
			const user = await userResponse.json()

			const updatedTasks = [...user.tasks, newTask]

			const updateResponse = await fetch(`${this.BASE_URL}/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...user, tasks: updatedTasks }),
			})

			const data = await updateResponse.json()
			return data
		} catch (error) {
			console.error('Failed to add task:', error)
			return Promise.reject(error)
		}
	}

	// async addTaskByUserId(userId: string, task) {
	// 	try {
	// 		const res = await fetch(`${this.BASE_URL}/${userId}`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({ task }),
	// 		})
	// 		const data = await res.json()
	// 		return data
	// 	} catch (error) {
	// 		console.log(error)
	// 		return Promise.reject()
	// 	}
	// }
}
