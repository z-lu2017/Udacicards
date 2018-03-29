import { getDecks } from '../api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const UPDATE_DECK = 'UPDATE_DECK'
export const NEW_DECK = 'NEW_DECK'

export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
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
