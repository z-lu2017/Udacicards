export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const UPDATE_DECK = 'UPDATE_DECK'

export function receiveDecks(){
  return {
    type: RECEIVE_DECKS,
  }
}

export function updateDeck(title, card){
  return {
    type: UPDATE_DECK,
    card,
    title,
  }
}
