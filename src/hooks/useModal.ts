import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext/ModalContext';

export const useModal = () => useContext(ModalContext)