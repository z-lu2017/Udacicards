import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDecks } from '../api';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';

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

  // componentDidMount(){
  //   console.log("right before dispatching")
  //   debugger
  //   this.props.boundReceiveDecks()
  // }

  render(){
    return(
      <View>
        {this.state.list.map((card)=>{
          <View>
            <Text>{card.title}</Text>
            <Text>{card.questions.length}</Text>
          </View>
        })}
        <Text>{this.state.list[0].title}</Text>
        <Text>{this.state.list[0].questions.length} cards</Text>
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
    boundReceiveDecks: ()=>{dispatch(receiveDecks())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
