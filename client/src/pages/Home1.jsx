import { useEffect }from 'react'
import { useAttendeesContext } from '../hooks/useAttendeesContext'
import { useAuthContext } from '../hooks/useAuthContext'


import AttendeeDetails from '../components/Attendees/AttendeesDetails'
import AttendeeForm from '../components/Attendees/AttendeesForm'

export const Home = () => {
  const {atendees, dispatch} = useAttendeesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchAttendees = async () => {
      const response = await fetch('/atendees', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ATENDEES', payload: json})
      }
    }

    if (user) {
      fetchAttendees()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="atendees">
        {atendees && atendees.map((atendee) => (
          <AttendeeDetails key={atendee._id} atendee={atendee} />
        ))}
      </div>
      <AttendeeForm />
    </div>
  )
}
