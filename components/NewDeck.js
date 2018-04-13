import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { newDeck } from '../actions';

class NewDeck extends React.Component{
  state = {
    title: ''
  }

  submit = () => {
    var title = this.state.title
    var that = this
    if (title.length === 0) {
      Alert.alert(
        'Invalid title!',
        'Please enter a valid title ',
        [
          {text: 'OK'},
        ],
        { cancelable: false }
      )
    return
    }
    AsyncStorage.setItem(title, JSON.stringify([])).then(()=>{
      that.props.boundNewDeck(title)
      that.props.navigation.navigate('Deck', {deck: {title: title, questions: []}})
    })
  }

  render(){
    var that = this;
    return(
      <View>
        <View>
          <Text style={styles.prompt}>Please enter your deck name:</Text>
          <TextInput editable={true} onChangeText={ (text) => {that.setState({title: text})}} placeholder='Enter Title Name here' style={styles.input}/>
          <TouchableOpacity onPress={()=>{that.submit()}} style={styles.submitButton}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
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

const styles = StyleSheet.create({
  prompt: {
    fontSize: 20,
    fontWeight: 'normal',
    paddingBottom: 10,
  },
  input:{
    paddingBottom: 10,
  },
  submitButton:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
  },
  buttonText:{
    fontSize: 18,
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
