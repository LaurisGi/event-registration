import { AttendeesContext } from "../components/context/attendeesContext1"
import { useContext } from 'react'

export const useAttendeesContext = () => {
  const context = useContext(AttendeesContext )

  if (!context) {
    throw Error('useAttendeeContext must be used inside an AttendeeContextProvider')
  }

  return context
}