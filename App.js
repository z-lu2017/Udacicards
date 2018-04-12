import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewCard from './components/NewCard';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Reactotron, { asyncStorage } from 'reactotron-react-native'

const Tabs = TabNavigator({
  deckList: {
    screen: DeckList
  },
  newDeck: {
    screen: NewDeck,
    navigationOptions:{
      title: 'New Deck',
    }
  },
});

const MainNavigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        title: 'Home'
      })
    },
    Deck:{
      screen: Deck,
    },
    Quiz:{
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: 'Quiz',
      })
    },
    NewCard:{
      screen: NewCard,
      navigationOptions: ({ navigation }) => {
        title: 'Add Card'
      }
    }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
 }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <MainNavigator />
      </Provider>
    );
  }
}
