import { createContext, useReducer } from 'react'

export const AttendeesContext = createContext()

export const attendeesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ATENDEE': 
      return {
        atendees: action.payload
      }
    case 'CREATE_ATENDEE':
      return {
        attendees: [action.payload, ...state.workouts]
      }
    case 'DELETE_ATENDEE':
      return {
        atendees: state.atendees.filter((a) => a.userid !== action.payload.userid)
      }
    default:
      return state
  }
}

export const AttendeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(attendeesReducer, {
    attendees: null
  })

  return (
    <AttendeesContext.Provider value={{...state, dispatch}}>
      { children }
    </AttendeesContext.Provider>
  )
}