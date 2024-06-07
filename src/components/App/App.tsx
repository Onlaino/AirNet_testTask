import '../../styles/global.css'
import { Login } from '../Login/Login'
import { Calendar } from '../Calendar/Calendar'
import { UserContextProvider } from '../../context/UserContext'
import { ModalContextProvider } from '../../context/ModalContext'

export const App = () => {
	return (
		<main className='main'>
			<ModalContextProvider>
				<UserContextProvider>
					<Login />
					<Calendar />
				</UserContextProvider>
			</ModalContextProvider>
		</main>
	)
}
