import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { saveDeckTitle, addCardToDeck, getDeck } from '../api';
import { newDeck } from '../actions';

class NewDeck extends React.Component{
  state = {
    title: ''
  }

  componentDidMount(){
    //put into sample data
    this.addingSampleData()
  }

  addingSampleData = () => {
    saveDeckTitle('React');
    console.log("first save deck title react")
    this.props.boundNewDeck('React');
    console.log("updating redux store - react deck")

    addCardToDeck('React', {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
    })
    console.log("adding card to react")

    addCardToDeck('React', {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    })

    saveDeckTitle('JavaScript');
    this.props.boundNewDeck('JavaScript');
    addCardToDeck('JavaScript', {
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    })

    getDeck('React');
  }

  submit = () => {
    saveDeckTitle(this.state.title)
    this.props.boundNewDeck(this.state.title)
  }

  render(){
    var that = this;
    return(
      <View>
        <View>
          <Text>Please enter your deck name:</Text>
          <TextInput editable={true} onChangeText={ (text) => {that.setState({title: text})}} placeholder='Enter Title Name here'/>
          <TouchableOpacity onPress={()=>{that.submit()}}><Text>Submit</Text></TouchableOpacity>
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
    boundNewDeck: (title)=>{dispatch(newDeck(title))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
