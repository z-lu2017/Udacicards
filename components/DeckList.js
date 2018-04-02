import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { AsyncStorage } from 'react-native';

class DeckList extends React.Component{
  state={
    list: []
  }

  componentDidMount(){
    var that = this
    //put into sample data
    AsyncStorage.getAllKeys().then((keys)=> {
      //keys exist in storage
      if (typeof keys !== 'undefined' && keys.length >0){
        //grab all decks
        AsyncStorage.multiGet(keys, (err, stores)=>{
          //stores are an array of key-value pair
          var arr = []
          stores.map((result, i, store)=>{
            let key = store[i][0]
            let value = JSON.parse(store[i][1])
            if (key){
              arr.push({title: key, questions: value})
            }
          })
          that.setState({list: arr})
          //TODO: update redux store
          that.props.boundReceiveDecks(arr)
        })
      }
      //keys don't exist
      else{
        //send a message no data found
        Alert.alert(
          'No decks found',
          'Sample data used here.',
          [
            {text: 'OK'},
          ]
        )
        //put in dummy data and set state to dummy data
        AsyncStorage.multiSet([
          [
            'React',
          JSON.stringify([{
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }])
          ],
          [
            'JavaScript',
            JSON.stringify([{
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }])
          ]
        ]).then(()=>{
          that.setState({list: [
            {
              title: 'React',
              questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          ]})
          that.props.boundReceiveDecks([
            {
              title: 'React',
              questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          ])
        })
      }
    })
  }

  render(){
    console.log("inside render", this.state.list[0])
    return(
      <View>
        <View>
          {this.state.list.map((deck)=>{
            return (<View key={deck.title}>
                    <Text>{deck.title}</Text>
                    <Text>{deck.questions.length}</Text>
                  </View>)
          })}
        </View>
      </View>
  )
  }
}

function mapStateToProps(decks){
  return{
    decks: decks
  }
}

function mapDispatchToProps(dispatch){
  return {
    boundReceiveDecks: (decks)=>{dispatch(receiveDecks(decks))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
