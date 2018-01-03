import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class %FILE% extends Component {
  render() {
    return (
      <View style={styles.container}>
        %HERE%
      </View>
    );
  }
}

%FILE%.propTypes = {
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
