import { RECEIVE_DECKS, UPDATE_DECK, FETCH_DECKS, FETCH_DECKS_REQUEST } from '../actions'


function decks(state = [], action){
  switch(action.type){
    case RECEIVE_DECKS:
      const decks = action.decks
      const stateCopy = state
      const returnDecks = stateCopy.concat(decks)
      console.log("inside reducers")
      return returnDecks

    case FETCH_DECKS_REQUEST:
      return state

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
