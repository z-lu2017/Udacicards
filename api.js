import { AsyncStorage } from 'react-native';

//get all decks
export function getDecks(){
  console.log("before 1 async")
  AsyncStorage.getAllKeys().then((keys)=>{
    console.log("after get all keys")
    AsyncStorage.multiGet(keys)
  })
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
