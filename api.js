import { AsyncStorage } from 'react-native';

//get all decks
export function getDecks(){
  var returnDecks = []
  console.log("before 1 async")
  AsyncStorage.getAllKeys((err, keys) =>{
    console.log("after all keys get", keys)
    AsyncStorage.multiGet(keys)
    })
}

//get a single deck
export function getDeck(id){
  var deck = {}
  AsyncStorage.getItem(id).then((results)=>{
    const data = JSON.parse(results)
    console.log("trying get deck, what is results", data)
    deck = data
  })
  return deck
}

//save deck title
export function saveDeckTitle(title){
  AsyncStorage.mergeItem(title, JSON.stringify({
    title: title,
    questions: []
  }))
}

//add card to deck
export function addCardToDeck(title, card){
  console.log("is it triggered?", title)
  return AsyncStorage.getItem(title).then((results)=>{
    console.log("what are results", results)
    const data = JSON.parse(results)
    console.log("inside addCardToDeck, what is data", data)
    const newQuestions = data.questions.push(card)
    AsyncStorage.setItem(title, JSON.stringify({
      title: title,
      questions: newQuestions
    }))
  })
}
