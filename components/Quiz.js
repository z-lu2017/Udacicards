import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Octicons, Entypo } from '@expo/vector-icons';

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
        {
          this.state.hideComment
          ? null
          : ( this.state.correct
            ? <View style={styles.commentsContainer}><Octicons name='smiley' color='green' size={120} /><Text style={styles.correctComment}>Good Job!</Text><Text style={styles.cardsLeftComment}>{this.state.cardsLeft} card(s) left</Text></View>
            : <View style={styles.commentsContainer}><Entypo name='emoji-sad' color='red' size={150} style={styles.sad} /><Text style={styles.wrongComment}>Need to spend more time studying!</Text><Text style={styles.cardsLeftComment}>{this.state.cardsLeft} card(s) left</Text></View>
          )
        }
        {this.state.viewAnswer ? <View style={styles.QAcontainer}><View><Text style={styles.answer}>Answer: {this.state.card.answer}</Text></View><View style={styles.toggleButtonContainer}><TouchableOpacity onPress={this.toggle} style={styles.toggleButton}><Text style={styles.toggleButtonText}>Go back to question</Text></TouchableOpacity></View></View> : <View style={styles.QAcontainer}><View><Text style={styles.question}>Question: {this.state.card.question}</Text></View><View style={styles.toggleButtonContainer}><TouchableOpacity onPress={this.toggle} style={styles.toggleButton}><Text style={styles.toggleButtonText}>View Answer</Text></TouchableOpacity></View></View>}
        <View style={styles.correctWrongButtonContainer}>
          <View>
            <TouchableOpacity onPress={this.correct} style={styles.correctButton}>
              <Text style={styles.correctButtonText}>Correct! </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.wrong} style={styles.wrongButton}>
              <Text style={styles.wrongButtonText}>Wrong! </Text>
            </TouchableOpacity>
          </View>
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
  QAcontainer:{
    paddingTop: 10,
    paddingBottom: 10,
  },
  question: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1a53ff',
  },
  answer:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1a53ff',
  },
  toggleButtonContainer:{
    paddingTop: 20,
    paddingBottom: 20,
  },
  toggleButtonText: {
    fontSize: 15,
    fontWeight: 'normal',
  },
  toggleButton:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 10,
  },
  correctButton:{
    paddingLeft: 40,
    paddingRight: 40,
  },
  correctButtonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00cc00',
  },
  wrongButton:{
    paddingLeft: 40,
    paddingRight: 40,
  },
  wrongButtonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e60000',
  },
  correctWrongButtonContainer:{
    flexDirection: 'row',
  },
  correctComment:{
    fontSize: 20,
    color: '#00cc00',
    fontWeight: 'bold',
  },
  wrongComment:{
    fontSize: 20,
    color: '#e60000',
    fontWeight: 'bold',
  },
  cardsLeftComment:{
    fontSize: 18,
    fontWeight: 'normal',
    color: 'black',
  },
  commentsContainer:{
    paddingBottom: 50,
  },
  sad: {
    paddingLeft: 30,
  },
})

export default connect(mapStateToProps)(Quiz)
