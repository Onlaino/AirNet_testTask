import { useContext } from 'react'
import { UserContext } from '../context/UserContext/UserContext'

export const useUser = () => useContext(UserContext)
