import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import AreaModal from './components/AreaModal';
import Login from './components/Login';
import SpotifyAuth from './components/SpotifyAuth';
import Map from './components/Map';
import inside from 'point-in-polygon';
import * as api from './api';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: 'Matthew Atkin',
        points: 200,
        hasChosenSpotifyOption: false
      },
      currentLocation: {},
      inAnArea: false,
      currentArea: {},
      playlists: [],
      userPlaylists: [],
      areas: [],
      isLoggedIn: false,
      currentCity: {},
      isInCity: false
    }
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
                  const { playlists, area } = playlistDocs.data
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
          } else {
            const cityArr = this.state.currentCity.coordinates.map(coord => [coord.latitude, coord.longitude]);
            if (!inside(posArr, cityArr)) {
              this.set({
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
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0321,
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
    else if (!this.state.currentUser.hasChosenSpotifyOption) return (
      <SpotifyAuth styles={styles} spotifyAuth={() => this.spotifyAuth()} noSpotifyAuth={() => this.noSpotifyAuth()} />
    )
    else return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Block DJ</Text>
        </View>
        <Map styles={styles} currentLocation={this.state.currentLocation} areas={this.state.areas} />
        {this.state.inAnArea && <AreaModal currentLocation={this.state.currentLocation} currentArea={this.state.currentArea} areas={this.state.areas} playlists={this.state.playlists} />}
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
    marginTop: 22
  }
});
