import { ITasks } from '../interfaces/tasks.interface'


export const fetchTasks = async (): Promise<ITasks> => {
	try {
		const res = await fetch('https://localhost:3000/tasks')
		const data = await res.json()
		return data

	} catch (error) {
		console.log(error)
		return Promise.reject(error)
	}
	
}
