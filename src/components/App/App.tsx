import { UserContextProvider } from '../../context/UserContext';
import '../../styles/global.css';
import { Calendar } from '../Calendar/Calendar'

export const App = () => {
	return (
		<main className='main'>
			<UserContextProvider>
				<Calendar />
			</UserContextProvider>
		</main>
	)
}