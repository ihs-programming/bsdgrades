import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
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
      </View>
    );
  }

  login = () => {
    request.post('https://wa-bsd405-psv.edupoint.com/Login_Student_PXP.aspx?regenerateSessionId=True',
      {form: {username: this.state.username,
              password: this.state.password}},
      (err, response, body) => {
        if (err) {
          console.log("Error getting request:", err);
        }
        else {
          console.log("Response:", response);
        }
      });
  }
}

LoginForm.propTypes = {
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
