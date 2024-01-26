import React, { createContext, useContext } from 'react'

interface UserContextProps {
  user: UserProps
}

interface UserProps {
  name: string
  avatar: string
  address: string
  kleo: number
  userId: string
  loggedIn: boolean
  jwtToken: string
}

export const UserContext = createContext<UserContextProps | null>(null)

export const useAuthContext = () => {
  return useContext(UserContext)
}
