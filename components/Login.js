import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Image, TextInput } from 'react-native';
import logo from '/Users/matthewatkin/Northcoders/app-test/pleasework/assets/images/block-dj-logo-1.png';
import SignUp from './SignUp'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: props.styles,
      login: props.login,
      username: '',
    };
  }

  handleUsername = (e) => {
    console.log(e)
    this.setState({
      username: e
    })
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <Image source={logo} style={{ marginBottom: 15 }} />
        <TextInput style={{ height: 35, borderColor: 'green', borderWidth: 2, marginTop: 10, backgroundColor: 'white', width: 150, borderRadius: 10, paddingHorizontal: 12 }} placeholder="Username" onChangeText={(e) => this.handleUsername(e)} value={this.state.username} />
        <TextInput style={{ height: 35, borderColor: 'green', borderWidth: 2, marginTop: 10, backgroundColor: 'white', width: 150, borderRadius: 10, paddingHorizontal: 12 }} placeholder="Password" secureTextEntry={true} />
        <TouchableHighlight onPress={() => {
          console.log(this.state.username);
          this.state.login(this.state.username)
        }} style={this.state.styles.loginButton}>
          <Text style={this.state.styles.login}>Login</Text>
        </TouchableHighlight>
        <SignUp />
      </View>
    );
  }
}


