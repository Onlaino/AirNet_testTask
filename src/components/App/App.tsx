import '../../styles/global.css'
import { Login } from '../Login/Login'
import { Calendar } from '../Calendar/Calendar'
import { UserContextProvider } from '../../context/UserContext/UserContext'
import { ModalContextProvider } from '../../context/ModalContext/ModalContext'

export const App = () => {
	return (
		<main className='main'>
			<UserContextProvider>
				<ModalContextProvider>
					<Login />
					<Calendar />
				</ModalContextProvider>
			</UserContextProvider>
		</main>
	)
}
