import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import AreaModal from './components/AreaModal';
import Login from './components/Login';
import SpotifyAuth from './components/SpotifyAuth';
import Map from './components/Map';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        hasChosenSpotifyOption: false
      },
      currentLocation: {
        latitude: 53.486196968335136,
        longitude: -2.2359145558205,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      inAnArea: false,
      currentArea: { name: "Northern Quarter" },
      areaPlaylists: [
        { name: '' }
      ],
      areas: [
        {
          coordinates: [
            { latitude: 53.486196968335136, longitude: -2.2359145558205 },
            { latitude: 53.481518879521516, longitude: -2.227015072296922 },
            { latitude: 53.48186415564243, longitude: -2.230208644603522 },
            { latitude: 53.48157614811416, longitude: -2.231231865247196 },
            { latitude: 53.480873844102014, longitude: -2.2306954234442173 },
            { latitude: 53.48029901524724, longitude: -2.2324561665915326 },
            { latitude: 53.48123373546192, longitude: -2.2334539890289307 },
            { latitude: 53.482121, longitude: -2.237719 },
            { latitude: 53.481955, longitude: -2.238277 },
            { latitude: 53.482223, longitude: -2.239435, },
            { latitude: 53.484751, longitude: -2.238727 },
          ],
          name: 'Northern Quarter',
          description: 'Hipster place in Manchester',
          areaColor: 'rgba(219,84,97,0.3)',
          areaBorderColor: 'rgba(219,84,97,1)'
        },
        {
          coordinates: [
            { latitude: 53.485695, longitude: -2.239615, },
            { latitude: 53.486208, longitude: -2.241167, },
            { latitude: 53.486773, longitude: -2.240859 },
            { latitude: 53.486248, longitude: -2.239273 },
          ],
          name: 'Northcoders',
          description: 'Hip-happening place full of cool people',
          areaColor: 'rgba(142,249,243,0.3)',
          areaBorderColor: 'rgba(142,249,243,1)'
        }
      ],
      isLoggedIn: false
    }

    // setInterval(() => {
    //   navigator.geolocation.watchPosition(
    //     (position) => {
    //       this.setState({
    //         currentLocation: {
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           latitudeDelta: 0.0322,
    //           longitudeDelta: 0.0421,
    //           error: null,
    //         }
    //       });
    //     },
    //     (error) => this.setState({ error: error.message }),
    //     { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 },
    //   );
    // }, 1000);
  }


  spotifyAuth() {
    Linking.openURL('http://localhost:8888')
      .then(() => {
        this.setState({
          currentUser: {
            hasChosenSpotifyOption: true
          }
        })
      })
  }

  noSpotifyAuth() {
    this.setState({
      currentUser: {
        hasChosenSpotifyOption: true
      }
    })
  }

  login() {
    //api call to either create or get user info
    //.then( * setState with recieved userData)
    //if user has logged into spotify before set hasChosedSpotifyOption to true
    this.setState({
      loggedIn: true
    })
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0421,
            error: null,
          }
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 },
    );

    console.log('Hello')
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    if (!this.state.loggedIn) return (
      <Login styles={styles} login={() => this.login()} />
    )
    else if (!this.state.currentUser.hasChosenSpotifyOption) return (
      <SpotifyAuth styles={styles} spotifyAuth={() => this.spotifyAuth()} noSpotifyAuth={() => this.noSpotifyAuth()} />
    )
    else return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Block DJ</Text>
        </View>
        <Map styles={styles} currentLocation={this.state.currentLocation} areas={this.state.areas} />
        {this.state.inAnArea && <AreaModal currentLocation={this.state.currentLocation} currentArea={this.state.currentArea} />}
        {!this.state.inAnArea && <Text style={styles.noAreaMsg}>Make your way to area to see their playlists</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171738',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#171738',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  map: {
    height: 550,
    width: 500
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
  },
  welcomeMsg: {
    color: 'white'
  },
  areaCallout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaCalloutDescription: {
    margin: 5
  },
  areaCalloutName: {
    fontSize: 17,
    marginBottom: 3
  },
  login: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10
  },
  loginTitle: {
    fontSize: 40,
    color: 'white',
    marginTop: 40
  },
  loginMsg: {
    fontSize: 15,
    color: 'white'
  },
  noAreaMsg: {
    color: 'white',
    marginTop: 10
  }
});
