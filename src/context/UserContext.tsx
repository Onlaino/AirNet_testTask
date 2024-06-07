import { PropsWithChildren, createContext, useState } from 'react'

type UserType = {
	name?: string
}

type TypeUserContext = {
	user: UserType
	login: (name: string) => void
	logout: () => void
}

export const UserContext = createContext<TypeUserContext>({
	user: {},
	login: () => {},
	logout: () => {},
})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserType>({})

	const login = (name: string) => {
		console.log(name);
		setUser({
			name: name,
		})
	}

	const logout = () => {
		setUser({})
	
	}

	return (
		<UserContext.Provider value={{ login, logout, user }}>
			{children}
		</UserContext.Provider>
	)
}
