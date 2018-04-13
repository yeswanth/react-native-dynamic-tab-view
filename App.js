/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DynamicTabView from './DynamicTabView';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    this.data = [
      {title: 'Tab1', key: 'item1',color:'blue'},
      {title: 'Tab2', key: 'item2','color':'yellow'},
      {title: 'Tab3', key: 'item3','color':'brown'},
      {title: 'Tab4', key: 'item4',color:'blue'},
      {title: 'Tab5', key: 'item5','color':'yellow'},
      {title: 'Tab6', key: 'item6','color':'brown'},
      {title: 'Tab7', key: 'item7',color:'blue'},
      {title: 'Tab8', key: 'item8','color':'yellow'},
      {title: 'Tab9', key: 'item9','color':'brown'},
    ]
  }


  _renderItem =(item, index) => {
    return (<View 
              key={item['key']}
              style={{backgroundColor:item['color'],flex:1}}
              >
              </View>)
  }

  render() {
    
    return (
      <DynamicTabView
        data={this.data}
        renderTab={this._renderItem}    
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
