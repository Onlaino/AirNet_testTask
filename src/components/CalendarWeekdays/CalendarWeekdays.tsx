import { weekdays } from '../../utils/calendar.helpers'

export const CalendarWeekdays = () => {
	return (
		<ul className='calendar__weekdays'>
			{weekdays.map((wd, i) => (
				<li key={i} className='calendar__weekdays-day'>
					{wd}
				</li>
			))}
		</ul>
	)
}
