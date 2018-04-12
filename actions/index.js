export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const NEW_CARD = 'NEW_CARD'
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

export function newCard(title, card){
  return {
    type: NEW_CARD,
    card,
    title,
  }
}
