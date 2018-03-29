import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator } from 'react-navigation';
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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <Tabs/>
      </Provider>
    );
  }
}
