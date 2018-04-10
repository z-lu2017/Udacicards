import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

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
    AsyncStorage.getItem(this.state.deck.title, (err, result) => {
      console.log("what did i get", result)
      var oldArray = JSON.parse(result)
      console.log("what did i get after parse", oldArray)
      console.log("before push", this.state.question, this.state.answer)
      let delta = {
        question: this.state.question,
        answer: this.state.answer,
      }
      var newArray = oldArray.push(delta)
      console.log("what is new array", newArray)
      AsyncStorage.setItem(this.state.deck.title, JSON.stringify(newArray), () => {
        AsyncStorage.getItem(this.state.deck.title, (err, result) => {
          console.log("after setting see what i get", result)
        })
        //TODO: update Redux store
        //TODO: update rendering
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
          <TextInput editable={true} onChangeText={ (text) => {that.setState({question: text})}} placeholder='Enter question here' style={styles.input}/>
          <TextInput editable={true} onChangeText={ (text) => {that.setState({answer: text})}} placeholder='Enter answer here' style={styles.input}/>
        </View>
        <View>
          <TouchableOpacity onPress={this.submit}><Text>Submit</Text></TouchableOpacity>
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
  container:{
    flex: 1,
    paddingTop: 20,
    alignItems: 'stretch',
  },
  input:{
    paddingBottom: 10,
    alignSelf: "stretch",
  },
})

export default connect(mapStateToProps)(NewCard)
