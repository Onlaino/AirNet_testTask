import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TypeWeekdays } from '../../interfaces/weekdays.interface';

export interface IWeekDayProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	weekdays: TypeWeekdays;
}