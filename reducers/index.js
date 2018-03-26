import { RECEIVE_DECKS, UPDATE_DECK, FETCH_DECKS, FETCH_DECKS_REQUEST, NEW_DECK, SUBMIT } from '../actions';
import { combineReducers } from 'redux';


function decks(state = [], action){
  switch(action.type){
    case RECEIVE_DECKS:
      const decks = action.decks
      console.log("inside reducers receiveDecks, did i get it", decks)
      const stateCopy = state
      const returnDecks = stateCopy.concat(decks)
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

    case NEW_DECK:
      const title = action.title
      var stateCopy2 = state
      stateCopy2.push({
        title: {
          title: title,
          questions: []
        }
      })
      return stateCopy2

    default:
      return state
  }
}

function isSubmitted(state = {submitted: false}, action){
  switch(action.type){
    case SUBMIT:
      return {submitted: true}
    default:
      return state
  }
}

export default combineReducers({
  decks,
  isSubmitted
});
