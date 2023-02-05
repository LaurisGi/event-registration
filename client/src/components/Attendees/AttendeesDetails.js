import { useAttendeesContext } from "../../hooks/useAttendeesContext"
import { useAuthContext } from '../../hooks/useAuthContext'


const AttendeeDetails = ({ attendee }) => {
  const { dispatch } = useAttendeesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/attendees/' + attendee.id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_ATTENDEE', payload: json})
    }
  }

  return (
    <div className="atendee-details">
      <h4>{attendee.name}</h4>
      <p><strong>Surname: </strong>{attendee.surname}</p>
      <p><strong>Email:</strong>{attendee.email}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default AttendeeDetails