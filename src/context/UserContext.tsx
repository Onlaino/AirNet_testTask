import { PropsWithChildren, createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

type UserType = {
	name?: string
	id: string
}

type TypeUserContext = {
	user: UserType
	login: (name: string) => void
	logout: () => void
}

export const UserContext = createContext<TypeUserContext>({
	user: { name: '', id: '' },
	login: () => {},
	logout: () => {},
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserType>({ name: '', id: '1' })

	const login = (name: string) => {
		setUser({
			name: name,
			id: '1',
		})
	}

	const logout = () => {
		setUser({
			name: '',
			id: '',
		})
	}

	return (
		<UserContext.Provider value={{ login, logout, user }}>
			{children}
		</UserContext.Provider>
	)
}
