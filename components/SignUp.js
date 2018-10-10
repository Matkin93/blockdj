import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    return (
      <TouchableHighlight style={styles.loginButton}>
        <Text style={styles.login}>Sign Up</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10
  }
});
