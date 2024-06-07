import { useModal } from '../../hooks/useModal';

export const TasksModal: React.FC = () => {
	const { isOpen, tasks, setIsOpen } = useModal();

	if (!isOpen) return null

	return (
		<div className='modal'>
			<h2 className='modal__heading'>Задачи на день</h2>
			<div className='modal__content'>
				{tasks.map(task => (
					<div className='modal__content-item' key={task.id} task={task} />
				))}
			</div>
			<div className='modal__footer'>
				<button onClick={() => setIsOpen(false)}>Закрыть</button>
			</div>
		</div>
	)
}