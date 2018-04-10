import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
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
    },
    Deck:{
      screen: Deck,
    },
    Quiz:{
      screen: Quiz,
    }
  },
  {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
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
