import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, Image } from 'react-native';
import AreaModal from './components/AreaModal';
import Login from './components/Login';
import SpotifyAuth from './components/SpotifyAuth';
import Map from './components/Map';
import inside from 'point-in-polygon';
import * as api from './api';
import logo from '/Users/matthewatkin/Northcoders/app-test/pleasework/assets/images/block-dj-logo-small.png'

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      username: 'matkin93',
      currentUser: {
      },
      currentLocation: {},
      inAnArea: false,
      currentArea: {},
      playlists: [],
      userPlaylists: [],
      areas: [],
      isLoggedIn: false,
      currentCity: {},
      isInCity: false,
      loading: false,
      hasChosenSpotifyOption: false
    }
  }


  spotifyAuth() {
    Linking.openURL('http://localhost:8888')
      .then(() => {
        this.setState({
          hasChosenSpotifyOption: true
        })
      })
  }

  noSpotifyAuth() {
    this.setState({
      hasChosenSpotifyOption: true
    })
  }

  login() {
    this.setState({
      loading: true
    }, () => {
      api.getUser(this.state.username)
        .then(userDoc => {
          const { profile } = userDoc.data;
          this.setState({
            currentUser: profile[0],
            loading: false,
            loggedIn: true
          })
        })
        .catch(console.log)
    })
  }

  checkAreaAndFetchPlaylists(position) {
    api.checkAreaAndFetchPlaylists(`lat=${position.coords.latitude}&long=${position.coords.longitude}`, this.state.currentCity._id)
      .then(playlistDocs => {
        const { playlists, area } = playlistDocs.data
        this.setState({
          playlists,
          currentArea: area,
          inAnArea: true
        })
      })
      .catch(console.log)
  }

  checkCityAndFetchAreas(position) {
    api.checkCityAndFetchAreas(`${position.coords.latitude}&${position.coords.longitude}`)
      .then(areasDocs => {
        const { areas, city } = areasDocs.data;
        if (city._id) {
          this.setState({
            areas,
            currentCity: city,
            isInCity: true
          }, () => {
            if (this.state.isInCity) {
              api.checkAreaAndFetchPlaylists(`lat=${position.coords.latitude}&long=${position.coords.longitude}`, city._id)
                .then(playlistDocs => {
                  const { playlists, area } = playlistDocs.data;
                  this.setState({
                    playlists,
                    currentArea: area,
                    inAnArea: true
                  })

                })
                .catch(console.log)
            }
          })
        }
      })
      .catch(console.log)
  }

  initialiseChecks() {
    setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const posArr = [position.coords.latitude, position.coords.longitude];
        if (!this.state.isInCity) {
          this.checkAreaAndFetchPlaylists(position)
        } else if (!this.state.inAnArea) {
          this.checkAreaAndFetchPlaylists(position)
        } else {
          const cityArr = this.state.currentCity.coordinates.map(coord => [coord.latitude, coord.longitude]);
          if (!inside(posArr, cityArr)) {
            this.setState({
              currentCity: {},
              isInCity: false,
              areas: [],
              currentArea: {},
              inAnArea: false
            })
          } else if (this.state.inAnArea) {
            const areaArr = this.state.currentArea.bounds.map(coord => [coord.latitude, coord.longitude]);
            if (!inside(posArr, areaArr)) {
              this.setState({
                currentArea: {},
                inAnArea: false
              })
            }
          }

        }
      })
    }, 15000)
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0221,
            error: null,
          }
        });
        this.checkCityAndFetchAreas(position);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, maximumAge: 1000, distanceFilter: 1 },
    )
    this.initialiseChecks();
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    if (!this.state.loggedIn) return (
      <Login styles={styles} login={() => this.login()} />
    )
    else if (!this.state.hasChosenSpotifyOption) return (
      <SpotifyAuth styles={styles} spotifyAuth={() => this.spotifyAuth()} noSpotifyAuth={() => this.noSpotifyAuth()} />
    )
    else if (this.state.loading) return (
      <View>
        <Text>Loading</Text>
      </View>
    )
    else return (
      <View style={styles.container}>
        <View>
          {/* <Text style={styles.title}>Block DJ</Text> */}
          <Image source={logo} style={{ marginBottom: 7, marginTop: 10 }} />
        </View>
        <Map styles={styles} currentLocation={this.state.currentLocation} areas={this.state.areas} />
        {this.state.inAnArea && <AreaModal currentLocation={this.state.currentLocation} currentArea={this.state.currentArea} areas={this.state.areas} playlists={this.state.playlists} username={this.state.username} userId={this.state.currentUser._id} currentUser={this.state.currentUser} />}
        {!this.state.inAnArea && <Text style={styles.noAreaMsg}>Make your way to an area to see playlists</Text>}
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
    alignContent: 'center',
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#171738',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  map: {
    height: 538,
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
    maxWidth: 250
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
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
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
    marginTop: 22
  }
});
