import {
	createContext,
	useState,
	PropsWithChildren,
	Dispatch,
	SetStateAction,
	useEffect,
} from 'react'
import { ITask } from '../interfaces/tasks.interface'
import { useUser } from '../hooks/useUserContext'
import { TaskService } from '../services/taskService'

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

const taskService = new TaskService()

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { user } = useUser()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [tasks, setTasks] = useState<ITask[]>([])
	const [selectedDay, setSelectedDay] = useState<Date | null>(null)

	useEffect(() => {
		const fetchTaskForUser = async (id: string) => {
			const currentUser = await fetch(`http://localhost:3000/users/${id}`)
			const userData = await currentUser.json()
			setTasks(userData);
			return userData.tasks
			// const currentTasks = await taskService.fetchTasksByUserId(user.id);
			// console.log(currentTasks);
		}

		fetchTaskForUser(user.id);
	}, [setTasks])

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
