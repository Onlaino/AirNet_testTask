import {
	createContext,
	useState,
	PropsWithChildren,
	Dispatch,
	SetStateAction,
} from 'react'
import { ITask } from '../interfaces/tasks.interface'

// Define the type for the context state including isOpen, tasks, and a method to set tasks
interface ModalContextType {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	tasks: ITask[]
	setTasks: Dispatch<SetStateAction<ITask[]>>
	selectedDay: Date | null
	setSelectedDay: Dispatch<SetStateAction<Date | null>>
}

const defaultContextValue: ModalContextType = {
	isOpen: false,
	setIsOpen: () => {},
	tasks: [], // Initialize with an empty array or fetch tasks as needed
	setTasks: () => {},
	selectedDay: null,
	setSelectedDay: () => {},
}

export const ModalContext = createContext<ModalContextType>(defaultContextValue)

export const ModalContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [tasks, setTasks] = useState<ITask[]>([]) 
	const [selectedDay, setSelectedDay] = useState<Date | null>(null)

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
