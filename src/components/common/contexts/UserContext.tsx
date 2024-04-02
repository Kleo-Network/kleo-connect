import React, { createContext, useContext } from 'react'
import { UserData } from '../../constants/SignupData'

export interface UserContextProps {
  user: UserData
  setUser: (user: UserData) => void
}

export const UserContext = createContext<UserContextProps | null>(null)

export const useAuthContext = () => {
  return useContext(UserContext)
}
