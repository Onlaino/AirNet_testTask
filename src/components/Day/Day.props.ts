import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ITask } from '../../interfaces/tasks.interface';

export interface IDayProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	date: Date;
	tasks: ITask[];
}