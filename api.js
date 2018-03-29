import { AsyncStorage } from 'react-native';

//putting sample data
export function initialize(){
  console.log("inside initialize called")
  return AsyncStorage.setItem('React', JSON.stringify([
    {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    }
  ])
).then(()=>{
  console.log("before second setitem")
  AsyncStorage.setItem('JavaScript', JSON.stringify([{
    question: 'What is a closure?',
    answer: 'The combination of a function and the lexical environment within which that function was declared.'
  }]))
})
}

//get all decks
export function getDecks(callback){
  console.log("GET DECKS CALLED")
  return AsyncStorage.getAllKeys((err, keys) => {
    console.log("inside get all keys", err, keys)
    AsyncStorage.multiGet(keys,(err, results) => {
      console.log("results", results)
      callback(results)
    })
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
  AsyncStorage.setItem(title, JSON.stringify({
    title: title,
    questions: []
  }))
}

//add card to deck
export function addCardToDeck(title, card){
  return AsyncStorage.getItem(title).then((results)=>{
    const data = JSON.parse(results)
    const newQuestions = data.questions.push(card)
    AsyncStorage.setItem(title, JSON.stringify({
      title: title,
      questions: newQuestions
    }))
  })
}
