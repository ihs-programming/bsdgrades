import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import cheerio from 'react-native-cheerio';

import Config from '../debug_config.js';

export default class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.logout();
    this.state = {
      username: '',
      password: '',
    };
  }

  logout = () => {
    const LOGOUT_URL='https://wa-bsd405-psv.edupoint.com/Login_Student_PXP.aspx?Logout=1';
    fetch(LOGOUT_URL);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textbox}
          placeholder="Username"
          onChangeText={(text) => this.setState({username: text})}/>

        <TextInput
          style={styles.textbox}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          onSubmitEditing={this.login}
          secureTextEntry />

        <Button
          title="Login"
          onPress={this.login}/>
      </View>
    );
  }

  login = () => {
    const SYNERGY_URL='https://wa-bsd405-psv.edupoint.com/Login_Student_PXP.aspx?regenerateSessionId=True';
    const DEFAULT_VIEW_DATA = {
      '__VIEWSTATE': 'uLbMCQO0I5F4wpBKXp6dRPfWStXkktMJU7+IBgsX9IYlHLpRNR8+kbEfQCNczPkLC2zMcXCYTHz/tPbaynvTfEUHKQ8JZShp2tCfAnSFVXw=',
      '__VIEWSTATEGENERATOR': 'C520BE40',
      '__EVENTVALIDATION': 'MpQA87q7SrCpYdn6c5ERyOyRgExBhem8bPQWKoy4G0osUsOXCHZ8Wdb1cvq/N0NaC19T7oHfZN4jr93t0h3TYbDTSMo/nqWBxiM5ywAA06Ey+galdywkE0pqNLv9JZTMuhZHdICxqAGkYqlxR1zo/08tEWpjZiabL2jQChbXHNY=',
    };

    let formData = new FormData();
    if (Config.username && Config.password) {
      formData.append('username', Config.username);
      formData.append('password', Config.password);
    }
    else {
      formData.append('username', this.state.username);
      formData.append('password', this.state.password);
    }
    for (let k in DEFAULT_VIEW_DATA) {
      formData.append(k, DEFAULT_VIEW_DATA[k]);
    }

    const INVALID_LOGIN_MESSAGE='Invalid login';
    return fetch(SYNERGY_URL,
      {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        return response.text();
      })
      .then(text => {
        if (this.isLoginPage(text)) {
          throw INVALID_LOGIN_MESSAGE;
        }
        this.props.onLogin();
      })
      .catch(err => {
        console.log("Error getting grade html:", err);
      });
  }

  isLoginPage = (pagehtml) => {
    let $ = cheerio.load(pagehtml);
    return $('#LoginMessage').length > 0;
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textbox: {
    height: 40,
    width: 200,
  },
});
