import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { newDeck } from '../actions';

class NewDeck extends React.Component{
  state = {
    title: ''
  }

  componentDidMount(){

  }

  submit = () => {
    var title = this.state.title
    var that = this
    AsyncStorage.setItem(title, JSON.stringify({
      title: title,
      questions: []
    })).then(()=>{
      that.props.boundNewDeck(title)
    })
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
