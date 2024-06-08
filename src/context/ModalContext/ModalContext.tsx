import {
	createContext,
	useState,
	PropsWithChildren,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react'
import { ITask } from '../../interfaces/tasks.interface'
import { useUser } from '../../hooks/useUserContext'

interface ModalContextType {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	tasks: ITask[]
	setTasks: Dispatch<SetStateAction<ITask[]>>
	selectedDay: Date | null
	setSelectedDay: Dispatch<SetStateAction<Date | null>>
}

const initialValue: ModalContextType = {
	isOpen: false,
	setIsOpen: () => {},
	tasks: [],
	setTasks: () => {},
	selectedDay: null,
	setSelectedDay: () => {},
}

export const ModalContext = createContext<ModalContextType>(initialValue)

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { user } = useUser()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [tasks, setTasks] = useState<ITask[]>([])
	const [selectedDay, setSelectedDay] = useState<Date | null>(null)

	useEffect(() => {
		const fetchTasksForUser = async (userId: string): Promise<ITask[]> => {
			try {
				const response = await fetch(`http://localhost:3000/users/${userId}`)
				const userData = await response.json()
				return userData.tasks
			} catch (error) {
				console.error('Error fetching tasks for user:', error)
				throw error
			}
		}
		const fetchAndSetTasksForUser = async () => {
			if (!user.id) {
				return
			}

			try {
				const fetchedTasks = await fetchTasksForUser(user.id)
				setTasks(fetchedTasks)
			} catch (error) {
				console.error('Ошибка при получении и установке задач:', error)
			}
		}

		fetchAndSetTasksForUser()
	}, [user.id])

	return (
		<ModalContext.Provider
			value={{
				isOpen,
				setIsOpen,
				tasks,
				setTasks,
				selectedDay,
				setSelectedDay,
			}}
		>
			{children}
		</ModalContext.Provider>
	)
}
