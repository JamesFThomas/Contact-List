import {SET_ALERT, REMOVE_ALERT} from '../types'

export default ( state, action) => {
  switch(action.type) {
    case SET_ALERT:
      // return previous state with new message object sent in payload
      return [...state, action.payload];
    case REMOVE_ALERT:
      // remove the alert who's id doesn't match the id sent in payload
      return state.filter(alert => alert.id !== action.payload)
    default:
      return state;
  }
}