import { getDecks } from '../api'

export const FETCH_DECKS_REQUEST = 'FETCH_DECKS_REQUEST'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const FETCH_DECKS = 'FETCH_DECKS'
export const UPDATE_DECK = 'UPDATE_DECK'
export const NEW_DECK = 'NEW_DECK'

function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

function fetchDecksRequest(){
  return {
    type: FETCH_DECKS_REQUEST
  }
}

export function fetchDecks(){
  return function (dispatch){
    dispatch(fetchDecksRequest())
    return getDecks().then((decks)=>{
      dispatch(receiveDecks(decks))
    })
  }
}

export function newDeck(title){
  return {
    type: NEW_DECK,
    title,
  }
}

export function updateDeck(title, card){
  return {
    type: UPDATE_DECK,
    card,
    title,
  }
}
