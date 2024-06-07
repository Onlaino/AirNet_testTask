import { PropsWithChildren, createContext, useState } from 'react'

export const UserContext = createContext({})

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState({})

	const login = (name: string) => {
		setUser({
			name: name,
		})
	}

	const logout = () => {
		setUser({})
	}

	return (
		<UserContext.Provider value={{login, logout, user}}>
			{children}
		</UserContext.Provider>
	)
}
