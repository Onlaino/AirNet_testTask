import { ITasks } from '../interfaces/tasks.interface'

export const fetchTasks = async (): Promise<ITasks> => {
	try {
		const res = await fetch('https://localhost:3000/tasks')
		const data = await res.json()
		return data
	} catch (error) {
		return Promise.reject(error)
	}
}

export const fetchTasksForUserAndDate = async (userId: number) => {
	try {
		const res = await fetch(`https://localhost:3000/tasks/${userId}`)
		const data = await res.json()
		console.log(data)
		return data
	} catch (error) {
		return Promise.reject()
	}
}
