import { RECEIVE_DECKS, NEW_CARD, NEW_DECK } from '../actions';
import { combineReducers } from 'redux';


function decks(state = [], action){
  switch(action.type){
    case RECEIVE_DECKS:
      const decks = action.decks
      const stateCopy = state
      const returnDecks = stateCopy.concat(decks)
      return returnDecks

    case NEW_CARD:
      var returnDeck = state
      const title2 = action.title
      const card = action.card
      for (var i=0; i<returnDeck.length; i++){
        if (returnDeck[i].title === title2){
          returnDeck[i].questions.push(card)
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
