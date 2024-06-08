import { ModalContextProvider } from '../../context/ModalContext'
import { UserContextProvider } from '../../context/UserContext/UserContext'
import '../../styles/global.css'
import { Calendar } from '../Calendar/Calendar'
import { Login } from '../Login/Login'

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
