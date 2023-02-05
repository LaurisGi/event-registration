import { useState } from "react"
import { useAttendeesContext } from "../../hooks/useAttendeesContext"
import { useAuthContext } from '../../hooks/useAuthContext'

const AttendeeForm = () => {
  const { dispatch } = useAttendeesContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState(null)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const attendee = {name , surname, email, phone}

    const response = await fetch('/attendees', {
      method: 'POST',
      body: JSON.stringify(attendee),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setSurname('')
      setEmail('')
      setPhone('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_ATTENDEE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Attendee</h3>

      <label>Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Surname:</label>
      <input 
        type="text"
        onChange={(e) => setSurname(e.target.value)}
        value={surname}
        className={emptyFields.includes('surname') ? 'error' : ''}
      />
      <label>Email:</label>
      <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>Tel:</label>
      <input 
        type="number"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <button>Add Attendee</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AttendeeForm