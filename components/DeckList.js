import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDecks } from '../actions';

class DeckList extends React.Component{
  state={
    list: []
  }

  componentDidMount(){
    console.log("this.props", this.props)
    this.props.boundFetchDecks()
  }

  render(){
    console.log("what is props", this.props)
    return(
      <View>
        <View>
          {this.state.list.map((deck)=>{
            return (<View key={deck.title}>
                    <Text>{deck.title}</Text>
                    <Text>{deck.questions.length}</Text>
                  </View>)
          })}
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
    boundFetchDecks: ()=>{dispatch(fetchDecks())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
