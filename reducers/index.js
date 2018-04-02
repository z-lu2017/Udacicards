import { RECEIVE_DECKS, UPDATE_DECK, NEW_DECK } from '../actions';
import { combineReducers } from 'redux';


function decks(state = [], action){
  switch(action.type){
    case RECEIVE_DECKS:
      const decks = action.decks
      const stateCopy = state
      const returnDecks = stateCopy.concat(decks)
      return returnDecks

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
        title: title,
        questions: []
      })
      return stateCopy2

    default:
      return state
  }
}

export default decks;
