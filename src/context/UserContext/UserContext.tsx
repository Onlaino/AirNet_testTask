import { PropsWithChildren, createContext, useState } from 'react'
import { TypeUserContext, UserType } from './types.userContext'
import { UserService } from '../../services/user.service'
import { IUser } from '../../interfaces/user.interface'
import { useModal } from '../../hooks/useModal'

const userService = new UserService()

export const UserContext = createContext<TypeUserContext>({
	user: { name: '', id: '', tasks: [] },
	login: () => {},
	logout: () => {},
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const { setTasks } = useModal()
	const [user, setUser] = useState<UserType>({ name: '', id: '', tasks: [] })

	const login = async (name: string, userId: string) => {
		try {
			const users: IUser[] = await userService.getAllUsers()
			const existingUser = users.find(user => user.name === name)

			if (existingUser) {
				setUser({
					name: existingUser.name,
					id: existingUser.id,
					tasks: existingUser.tasks,
				})
				return
			}

			const newUser = await userService.createUser({
				name,
				id: userId,
				tasks: [],
			})
			
			if (newUser && newUser.id) {
				setUser({
					name: newUser.name,
					id: newUser.id,
					tasks: newUser.tasks,
				})
			} else {
				throw new Error('Unable to create new user')
			}
		} catch (error) {
			console.error('Login failed:', error)
		}
	}

	const logout = () => {
		setUser({
			name: '',
			id: '',
			tasks: [],
		})
		setTasks([]);
	}

	return (
		<UserContext.Provider value={{ login, logout, user }}>
			{children}
		</UserContext.Provider>
	)
}
