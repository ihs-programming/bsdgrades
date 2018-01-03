import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './components/LoginScreen.js';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginScreen onLogin={() => console.log("Logged in!")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
