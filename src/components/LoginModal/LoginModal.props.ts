import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ILoginModal
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	setIsOpen: (bool: boolean) => void
}
