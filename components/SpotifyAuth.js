import React from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

const SpotifyAuth = ({
  spotifyAuth, noSpotifyAuth
}) => (
    <View style={styles.authContainer}>
      <Text style={styles.loginMsg}>To compete and post playlists you will need to login with spotify, click the button below to retrieve your playlists</Text>
      <TouchableHighlight onPress={() => spotifyAuth()} style={styles.loginButton}>
        <Text style={styles.login}>Login With Spotify</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => noSpotifyAuth()} >
        <Text style={styles.noLogin}>I don't want to log in with spotify</Text>
      </TouchableHighlight>
    </View>
  );

const styles = StyleSheet.create({
  login: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10,
    marginBottom: 30
  },
  loginMsg: {
    marginTop: 170,
    marginBottom: 60,
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 20
  },
  noLoginMsg: {
    marginBottom: 40,
    color: 'white'
  },
  noLogin: {
    textDecorationLine: 'underline',
    color: 'white'
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#171738',
    alignItems: 'center'
  }
});

export default SpotifyAuth;
