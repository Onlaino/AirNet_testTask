import { ITask } from '../interfaces/tasks.interface'
import { IUser } from '../interfaces/user.interface'

export class UserService {
	private readonly BASE_URL = 'http://localhost:3000/users'

	async getAllUsers() {
			try {
				const res = await fetch(this.BASE_URL)
				const data = await res.json()
				return data
				
			} catch (error) {
				console.error('error for creating user', error)
				throw error
			}
	}

	async createUser(userData: IUser): Promise<IUser> {
		try {
			const res = await fetch(this.BASE_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			})
			const data = await res.json()
			return data
		} catch (error) {
			console.error('error for creating user', error)
			throw error
		}
	}

	async deleteUser(userId: string): Promise<void> {
		try {
			const res = await fetch(`${this.BASE_URL}/${userId}`, {
				method: 'DELETE',
			})

			if (!res.ok) {
				throw new Error('Failed to delete the user.')
			}
		} catch (error) {
			console.error('Error deleting user:', error)
			throw error
		}
	}

	async updateUser(userId: string, tasks: ITask[]): Promise<void> {
		try {
			const response = await fetch(`${this.BASE_URL}/${userId}`, {
				method: 'PATCH', 
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ tasks }),
			})

			const updatedUser = await response.json()
			return updatedUser
		} catch (error) {
			console.error('Error updating user tasks:', error)
			throw error
		}
	}
}
