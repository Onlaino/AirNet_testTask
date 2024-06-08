import { ITask } from './tasks.interface';

export interface IUser {
	id: string;
	name: string;
	tasks: ITask[]
}