import { UserContextProvider } from '../../context/UserContext';
import '../../styles/global.css';
import { Calendar } from '../Calendar/Calendar'
import { Login } from '../Login/Login';

export const App = () => {
	return (
		<main className='main'>
			<UserContextProvider>
				<Login />
				<Calendar />
			</UserContextProvider>
		</main>
	)
}