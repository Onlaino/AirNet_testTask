import { IUser } from '../interfaces/user.interface'

export class TaskService {
	private readonly	BASE_URL = 'http://localhost:3000/users'

	async fetchTasksByUserId(id: string): Promise<IUser> {
		try {
			const res = await fetch(`${this.BASE_URL}/${id}`)
			const data = res.json()
			return data
		} catch (error) {
			return Promise.reject()
		}
	}
}
