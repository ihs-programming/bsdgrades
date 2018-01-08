import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import LoginScreen from './components/LoginScreen.js';
import GradeScreen from './components/GradeScreen.js';

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sessionid: null,
      loggedIn: false,
    };
  }

  componentWillMount () {
    StatusBar.setHidden(true);
  }

  render() {
    let curScreen;
    if (this.state.loggedIn) {
      curScreen = (
        <GradeScreen logout={this.logout}/>
      );
    }
    else {
      curScreen = (
        <LoginScreen onLogin={this.onLogin} />
      );
    }
    return (
      <View style={styles.container}>
        {curScreen}
      </View>
    );
  }

  onLogin = () => {
    this.setState({loggedIn: true});
  }

  logout = () => {
    this.setState({loggedIn: false});
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
