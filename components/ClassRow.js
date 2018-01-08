import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class ClassRow extends Component {
  render() {
    let darkStyle = {};
    if (this.props.darken) {
      darkStyle.backgroundColor = 'lightgrey';
    }
    return (
      <TouchableOpacity style={styles.container}
        onPress={this.props.onClick}>
        <View style={[styles.container, darkStyle]}>
          <Text style={styles.period}> {this.props.period} </Text>
          <Text style={styles.course}> {this.props.course} </Text>
          <Text style={styles.grade}> {this.props.grade} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

ClassRow.propTypes = {
  period: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  darken: PropTypes.bool,
  onClick: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    minHeight: 60,
  },
  period: {
    flex: 1,
  },
  course: {
    flex: 3,
  },
  grade: {
    flex: 1,
  },
});
