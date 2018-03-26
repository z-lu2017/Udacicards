import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../api';
import { newDeck } from '../actions';

class NewDeck extends React.Component{
  state = {
    title: '',
  }

  submit = () => {
    console.log("what is title", this)
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
