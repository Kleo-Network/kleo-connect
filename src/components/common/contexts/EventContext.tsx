import React, { createContext, useState } from 'react'
import { NavbarEvents } from '../../constants/Events'

export const EventContext = createContext<{
  event: NavbarEvents | null
  updateEvent: (newEvent: NavbarEvents | null) => void
}>({ event: null, updateEvent: () => null })

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [event, setEvent] = useState<NavbarEvents | null>(null)

  const updateEvent = (newEvent: NavbarEvents | null) => {
    setEvent(newEvent)
  }

  return (
    <EventContext.Provider value={{ event, updateEvent }}>
      {children}
    </EventContext.Provider>
  )
}
