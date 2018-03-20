import { AsyncStorage } from 'react-native';

//get all decks
export function getDecks(){
  var decks = {}
  AsyncStorage.getAllKeys((err, keys) =>{
    console.log("did i get keys?", keys)
    AsyncStorage.multiGet(keys, (err, decks) => {
      decks.map
    })
  })
  console.log("what are decks in getDecks", decks)
  return decks
}

//get a single deck
export function getDeck(id){
  var deck = {}
  AsyncStorage.getItem(id).then((results)=>{
    const data = JSON.parse(results)
    deck = data
  })
  return deck
}

//save deck title
export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(title, JSON.stringify({
    title: title,
    questions: []
  }))
}

//add card to deck
export function addCardToDeck(title, card){
  return AsyncStorage.getItem(title).then((results)=>{
    const data = JSON.parse(results)
    data.questions.push(card)
  })
}
