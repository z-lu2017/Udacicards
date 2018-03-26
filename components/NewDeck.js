import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../api';
import { newDeck, submitDeck } from '../actions';

class NewDeck extends React.Component{
  state = {
    title: ''
  }

  // static navigationOptions = ({navigation}) => {
  //   console.log("navigation what ", navigation)
  //   return {
  //             tabBarVisible: (this.props.navigation.state.isVisible) ? true : false
  //
  //   };
  // };

  componentDidMount(){
    var isSubmitted = this.props.decks.isSubmitted
    this.props.navigation.setParams({
      isVisible: isSubmitted
    });
    console.log("what is props," , this.props)
  }

  submit = () => {
    saveDeckTitle(this.state.title)
    this.props.boundNewDeck(this.state.title)
    this.props.boundSubmitDeck()
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
    boundNewDeck: (title)=>{dispatch(newDeck(title))},
    boundSubmitDeck: ()=>{dispatch(submitDeck())},
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
