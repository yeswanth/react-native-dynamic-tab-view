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
import DynamicTabView from 'RNDynamicTabView';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      defaultIndex: 5
    }
    this.data = [
      { title: 'Tab1', key: 'item1', color: 'blue' },
      { title: 'Tab21212121', key: 'item2', 'color': 'yellow' },
      { title: 'Tab3222', key: 'item3', 'color': 'brown' },
      { title: 'Tab4', key: 'item4', color: 'blue' },
      { title: 'Tab5', key: 'item5', 'color': 'yellow' },
      { title: 'Tab6', key: 'item6', 'color': 'brown' },
      { title: 'Tab7', key: 'item7', color: 'blue' },
      { title: 'Tab8', key: 'item8', 'color': 'yellow' },
      { title: 'Tab9', key: 'item9', 'color': 'brown' },
    ]
  }


  _renderItem = (item, index) => {
    return (<View
      key={item['key']}
      style={{ backgroundColor: item['color'], flex: 1 }}
    >
    </View>)
  }

  onChangeTab = (index) => {
    console.log(index);
  }

  render() {

    return (
      <DynamicTabView
        data={this.data}
        renderTab={this._renderItem}
        defaultIndex={this.state.defaultIndex}
        containerStyle={styles.container}
        headerContainerStyle={styles.headerContainer}
        tabItemContainerStyle={styles.tabItemContainer}
        onChangeTab={this.onChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginTop: 16,
  },
  tabItemContainer: {
    backgroundColor: '#cf6bab'
  },
});
