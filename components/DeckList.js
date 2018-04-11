import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { AsyncStorage } from 'react-native';

class DeckList extends React.Component{
  state={
    list: []
  }

  // componentWillMount(){
  //   clear for testing
  //   AsyncStorage.clear();
  // }

  componentDidMount(){
    var that = this
    //put into sample data
    AsyncStorage.getAllKeys().then((keys)=> {
      //keys exist in storage
      if (typeof keys !== 'undefined' && keys.length >0){
        //grab all decks
        AsyncStorage.multiGet(keys, (err, stores)=>{
          //stores are an array of key-value pair
          var arr = []
          stores.map((result, i, store)=>{
            let key = store[i][0]
            let value = JSON.parse(store[i][1])
            if (key){
              arr.push({title: key, questions: value})
            }
          })
          //TODO: update redux store
          that.props.boundReceiveDecks(arr)
          that.setState({list: that.props.decks})
        })
      }
      //keys don't exist
      else{
        //send a message no data found
        Alert.alert(
          'No decks found',
          'Sample data used here.',
          [
            {text: 'OK'},
          ]
        )
        //put in dummy data and set state to dummy data
        AsyncStorage.multiSet([
          [
            'React',
          JSON.stringify([{
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }])
          ],
          [
            'JavaScript',
            JSON.stringify([{
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }])
          ]
        ]).then(()=>{
          that.setState({list: [
            {
              title: 'React',
              questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          ]})
          that.props.boundReceiveDecks([
            {
              title: 'React',
              questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                  question: 'Where do you make Ajax requests in React?',
                  answer: 'The componentDidMount lifecycle event'
                }
              ]
            },
            {
              title: 'JavaScript',
              questions: [
                {
                  question: 'What is a closure?',
                  answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
              ]
            }
          ])
        })
      }
    })
  }

  handleClick = (deck) => {
    this.props.navigation.navigate('Deck', {deck});
  }

  render(){
    //deduplicate deck list before rendering
    var renderArray = this.state.list
    if (renderArray.length > 0 ){
      for (var i=0; i<renderArray.length; i++){
        for (var j=1; j<renderArray.length; j++){
          if (renderArray[i].title === renderArray[j].title && i !== j ){
            renderArray.splice(j, 1)
          }
        }
      }
    }
    return(
      <View>
        <View>
          {renderArray.map((deck)=>{
            return (
              <View key={deck.title}>
                <TouchableWithoutFeedback onPress={()=>{this.handleClick(deck)}}>
                  <View style={styles.container}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.deckCount}> deck count: {deck.questions.length || 0}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
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
    boundReceiveDecks: (decks)=>{dispatch(receiveDecks(decks))}
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    paddingTop: 10,
    paddingBottom: 10,
  },
  deckCount:{
    fontSize: 15,
    color: 'black',
    paddingBottom: 20,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
