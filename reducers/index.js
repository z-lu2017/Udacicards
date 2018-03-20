import { RECEIVE_DECKS, UPDATE_DECK } from '../actions'
import { getDecks } from '../api'

function decks(state = {}, action){
  switch(action.type){
    case RECEIVE_DECKS:
      console.log("inside reducers before api call")
      decks = getDecks()
      console.log("after api call")
      return {
        ...state,
        ...decks,
      }
    case UPDATE_DECK:
      var returnDeck = state
      for (var key in returnDeck){
        if (key === action.title){
          returnDeck[key].questions.push(action.card)
        }
      }
      return returnDeck
    default:
      return state
  }
}

export default decks
