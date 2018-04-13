import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';

class Deck extends React.Component{
  state={
    deck: {}
  }

  componentDidMount(){
    this.setState({deck: this.props.navigation.state.params.deck})
  }

  startQuiz = (deck) => {
    this.props.navigation.navigate('Quiz', {deck});
  }

  addCard = (deck) => {
    this.props.navigation.navigate('NewCard', {deck});
  }

  render(){
    if( Object.keys(this.state.deck).length === 0 ){
      return null
    }
    var disabled = true
    if (this.state.deck.questions.length > 0){
      disabled = false
    }
    return(
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{this.state.deck.title}</Text>
        </View>
        <View>
          <Text style={styles.deckCount}>{this.state.deck ? this.state.deck.questions.length : 0} cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{this.startQuiz(this.state.deck)}} disabled={disabled}><Text style={styles.buttonText}>Start Quiz</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{this.addCard(this.state.deck)}}><Text style={styles.buttonText}>Add a new question</Text></TouchableOpacity>
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

export default connect(mapStateToProps)(Deck)
