import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';

class Quiz extends React.Component{
  state={
    deck: {},
    viewAnswer: false,
    card:{},
    correct: false,
    hideComment: true,
    correctCount: 0,
    cardsLeft: 0,
  }

  componentDidMount(){
    this.setState({
      deck: this.props.navigation.state.params.deck,
      card: this.props.navigation.state.params.deck.questions[0],
      cardsLeft: this.props.navigation.state.params.deck.questions.length,
    })
  }

  toggle = () =>{
    this.setState({
      viewAnswer: !this.state.viewAnswer,
    })
  }

  correct = () => {
    setTimeout(() => {this.setState({hideComment: true})}, 5000)
    var index;
    for (var i=0; i< this.state.deck.questions.length; i++){
      if (this.state.deck.questions[i].answer === this.state.card.answer){
        index = i
      }
    }
    var updateCorrectCount = this.state.correctCount + 1
    var correctRatio = updateCorrectCount / this.state.deck.questions.length
    correctRatio = parseFloat(correctRatio * 100).toFixed(2)+"%"
    if (index + 1 >= this.state.deck.questions.length){
      Alert.alert(
        'You have reached the end of your deck!',
        'Your score is ' + correctRatio,
        [
          {text: 'OK'},
        ]
      )
      this.setState({
        hideComment: false,
        correct: true,
        correctCount: updateCorrectCount,
        cardsLeft: 0,
      })
    }
    else{
      var newCard = this.state.deck.questions[index + 1]
      this.setState({
        correct: true,
        card: newCard,
        hideComment: false,
        viewAnswer: false,
        correctCount: updateCorrectCount,
        cardsLeft: this.state.cardsLeft - 1,
      })
    }
  }

  wrong = () =>{
    setTimeout(() => {this.setState({hideComment: true})}, 5000)
    var index;
    for (var i=0; i< this.state.deck.questions.length; i++){
      if (this.state.deck.questions[i].answer === this.state.card.answer){
        index = i
      }
    }
    var correctRatio2 = this.state.correctCount / this.state.deck.questions.length
    correctRatio2 = parseFloat(correctRatio2 * 100).toFixed(2)+"%"
    if (index + 1 >= this.state.deck.questions.length){
      Alert.alert(
        'You have reached the end of your deck!',
        'Your score is ' + correctRatio2,
        [
          {text: 'OK'},
        ]
      )
      this.setState({
        hideComment: false,
        correct: false,
        cardsLeft: 0,
      })
    }
    else{
      var newCard = this.state.deck.questions[index + 1]
      this.setState({
        correct: false,
        card: newCard,
        hideComment: false,
        viewAnswer: false,
        cardsLeft: this.state.cardsLeft - 1,
      })
    }
  }

  render(){
    if( Object.keys(this.state.deck).length === 0 ){
      return null
    }
    return(
      <View style={styles.container}>
        {this.state.viewAnswer ? <View><View><Text>Answer: {this.state.card.answer}</Text></View><View><TouchableOpacity onPress={this.toggle}><Text>Go back to question</Text></TouchableOpacity></View></View> : <View><View><Text>Question: {this.state.card.question}</Text></View><View><TouchableOpacity onPress={this.toggle}><Text>View Answer</Text></TouchableOpacity></View></View>}
        {
          this.state.hideComment
          ? null
          : ( this.state.correct
            ? <View><Text>Good Job!</Text><Text>{this.state.cardsLeft} cards left</Text></View>
            : <View><Text>Need to spend more time studying!</Text><Text>{this.state.cardsLeft} cards left</Text></View>
          )
        }
        <View>
          <TouchableOpacity onPress={this.correct}>
            <Text>Correct! </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.wrong}>
            <Text>Wrong! </Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer:{
    flexDirection: 'row',
  },
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    color: 'blue',
    paddingTop: 20,
    paddingBottom: 20,
  },
  deckCount:{
    fontSize: 20,
    color: 'black',
    paddingBottom: 20,
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
  },
  buttonText:{
    fontSize: 18,
  }
})

export default connect(mapStateToProps)(Quiz)
