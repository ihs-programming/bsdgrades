import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class AssignmentRow extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}> {this.props.name} </Text>
        <Text style={styles.date}> {this.props.date} </Text>
        <Text style={styles.points}> {this.props.points} </Text>
        <Text style={styles.score}> {this.props.score} </Text>
      </View>
    );
  }
}

AssignmentRow.propTypes = {
  name: PropTypes.string.isRequired,
  assignType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  points: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  scoretype: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name: {
    flex: 3,
  },
  date: {
    flex: 1,
  },
  points: {
    flex: 1,
  },
  score: {
    flex: 1,
  }
});
