import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

const Login = ({
  styles, login
}) => (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>
        Block DJ
      </Text>
      <Text style={styles.loginMsg}>
        Login to become to the Top DJ of your area!
      </Text>
      <TouchableHighlight onPress={() => login()} style={styles.loginButton}>
        <Text style={styles.login}>Login With Facebook</Text>
      </TouchableHighlight>
    </View>
  );

export default Login;

