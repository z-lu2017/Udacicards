import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { newCard } from '../actions';

class NewCard extends React.Component{
  state={
    deck: {},
    question: '',
    answer: '',
  }

  componentDidMount(){
    this.setState({deck: this.props.navigation.state.params.deck})
  }

  submit = () => {
    var that = this;
    AsyncStorage.getItem(this.state.deck.title, (err, result) => {
      var oldArray = JSON.parse(result)
      let delta = {
        question: this.state.question,
        answer: this.state.answer,
      }
      oldArray.push(delta)
      AsyncStorage.setItem(this.state.deck.title, JSON.stringify(oldArray), () => {
        that.props.boundNewCard(this.state.deck.title, delta)
        that.props.navigation.navigate('Deck', {deck: {title: that.state.deck.title, questions: oldArray}})
      })
    })
  }

  render(){
    var that = this;
    if( Object.keys(this.state.deck).length === 0 ){
      return null
    }
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.prompt}>Please enter question and answer below:</Text>
          <TextInput editable={true} onChangeText={ (text) => {that.setState({question: text})}} placeholder='Enter question here' style={styles.input}/>
          <TextInput editable={true} onChangeText={ (text) => {that.setState({answer: text})}} placeholder='Enter answer here' style={styles.input}/>
        </View>
        <View>
          <TouchableOpacity onPress={this.submit} style={styles.submitButton}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
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
    boundNewCard: (title, card)=>{dispatch(newCard(title, card))}
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 20,
    alignItems: 'stretch',
  },
  input:{
    paddingBottom: 10,
    alignSelf: "stretch",
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'normal',
    paddingBottom: 15,
  },
  submitButton:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  buttonText:{
    fontSize: 18,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)
