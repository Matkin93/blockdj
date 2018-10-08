import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

const SpotifyAuth = ({
  styles, spotifyAuth, noSpotifyAuth
}) => (
    <View style={styles.authContainer}>
      <Text style={styles.loginMsg}>To compete and post playlists you will need to login with spotify, click the button below to retrieve your playlists</Text>
      <TouchableHighlight onPress={() => spotifyAuth()} style={styles.loginButton}>
        <Text style={styles.login}>Login With Spotify</Text>
      </TouchableHighlight>
      <Text style={styles.loginMsg}>Otherwise if you'd prefer to just view and vote on playlists, click the button below</Text>
      <TouchableHighlight onPress={() => noSpotifyAuth()} style={styles.loginButton}>
        <Text style={styles.login}>Do Not Login With Spotify</Text>
      </TouchableHighlight>
    </View>
  );

export default SpotifyAuth;
