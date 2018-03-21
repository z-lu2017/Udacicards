import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions';

class DeckList extends React.Component{
  state={
    list: [
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
  ],
  }

  componentDidMount(){
    debugger
    this.props.boundFetchDecks()
  }

  render(){
    return(
      <View>
        {this.state.list.map((deck)=>{
          return (<View key={deck.title}>
                  <Text>{deck.title}</Text>
                  <Text>{deck.questions.length}</Text>
                </View>)
        })}
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
    boundFetchDecks: ()=>{dispatch(fetchDecks())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
