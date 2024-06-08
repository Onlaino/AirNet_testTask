import './LoginModal.css'
import CloseIcon from '@mui/icons-material/Close'
import { useUser } from '../../hooks/useUserContext'
import { ILoginModal } from './LoginModal.props'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const LoginModal = ({ setIsOpen }: ILoginModal) => {
	const inputRef = useRef<HTMLInputElement | null>(null!);
	const { login } = useUser()
	const [name, setName] = useState<string>('')

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		login(name, uuidv4())
		setIsOpen(false)
	}

	useEffect(() => {
		inputRef.current && inputRef.current.focus()
		const keyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}
		document.body.addEventListener('keydown', keyDown)
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.removeEventListener('keydown', keyDown)
			document.body.style.overflow = ''
		}
	}, [])

	return (
		<div className='login__form__wrapper'>
			<form className='login__form' onSubmit={handleSubmit}>
				<span className='login__form-close' onClick={() => setIsOpen(false)}>
					<CloseIcon />
				</span>
				<label className='login__form-label' htmlFor='name'>
					Type name
				</label>
				<input
					ref={inputRef}
					required
					className='login__form-input'
					placeholder='type name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<button className='login__form-button'>Login</button>
			</form>
		</div>
	)
}
