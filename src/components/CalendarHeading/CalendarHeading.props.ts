import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ICalendarHeadingProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLHeadElement>, HTMLHeadElement> {
	date: Date
	setDate: (date: Date) => void
}
