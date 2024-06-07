import './Login.css'
import { useUser } from '../../hooks/useUserContext'
import LoginIcon from '@mui/icons-material/Login'
import Face6Icon from '@mui/icons-material/Face6'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { LoginModal } from '../LoginModal/LoginModal'

export const Login = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { user, logout } = useUser()

	return (
		<div className='login'>
			{!user.name && (
				<div className='login__wrapper'>
					<h1 className='login-header' onClick={() => setIsOpen(true)}>
						Вход
					</h1>
					<LoginIcon className='login-icon' />
				</div>
			)}

			{isOpen && <LoginModal setIsOpen={setIsOpen} />}

			<h2 className='login__user'>
				{user.name && (
					<div className='login__user-name'>
						{user.name}
						<Face6Icon />
						{user.name && (
							<div className='login__logout' onClick={logout}>
								<LogoutIcon className='login__logout-icon' />
							</div>
						)}
					</div>
				)}
			</h2>
		</div>
	)
}
