import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import logo from '/Users/matthewatkin/Northcoders/app-test/pleasework/assets/images/block-dj-logo-1.png';
import SignUp from './SignUp'

const Login = ({
  styles, login
}) => (
    <View style={styles.container}>
      <Image source={logo} style={{ marginBottom: 15 }} />
      <TouchableHighlight onPress={() => login()} style={styles.loginButton}>
        <Text style={styles.login}>Login</Text>
      </TouchableHighlight>
      <SignUp />
    </View>
  );

export default Login;

