import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import PlaylistModal from './PlaylistModal';
import * as api from '../api';
import SubmitPlaylist from "./SubmitPlaylist";

export default class AreaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentArea: props.currentArea,
      currentLocation: props.currentLocation,
      areas: props.areas,
      playlists: props.playlists,
      topPlaylist: {},
      loading: true,
      username: props.username,
      userPlaylists: [],
      showSubmitPlaylist: false,
      submittedInThisArea: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleLike(playlist) {
    this.state.playlists.find(playlistElem => {
      return playlistElem._id === playlist._id
    })
  }

  handleSubmit = () => {
    this.setState({
      submittedInThisArea: true
    }, () => {

    })
  }

  backToAreaModal = () => {
    this.setState({
      showSubmitPlaylist: false
    })
  }

  getUserPlaylists() {
    api.getUserPlaylists(this.state.username)
      .then((userPlaylistsDocs) => {
        const { playlists } = userPlaylistsDocs.data
        this.setState({
          userPlaylists: playlists,
          showSubmitPlaylist: true
        })
      })
      .catch(console.log)
  }

  componentDidMount() {
    const topPlaylist = this.state.playlists.reduce((topPlaylist, playlist, i) => {
      if (i === 0) topPlaylist = playlist;
      else if (playlist.votes > topPlaylist.votes) topPlaylist = playlist;
      return topPlaylist;
    }, {})
    const orderedPlaylists = this.state.playlists.sort(function (a, b) {
      return a.votes - b.votes;
    }).reverse();
    this.setState({
      topPlaylist,
      loading: false,
      playlists: orderedPlaylists
    })
  }

  render() {
    if (this.state.loading) return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }} >
          <View>
            <Text>
              Loading
            </Text>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.modalMsg}>See Playlists in {this.state.currentArea.name}</Text>
        </TouchableHighlight>
      </View>
    )
    else if (this.state.showSubmitPlaylist) return (
      <SubmitPlaylist userPlaylists={this.state.userPlaylists} modalVisible={this.state.modalVisible} backToAreaModal={this.backToAreaModal} currentArea={this.state.currentArea} username={this.state.username} handleSubmit={this.handleSubmit} />
    )
    else return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }} >
          <View style={styles.modal}>
            <ScrollView style={styles.scrollView}>
              <View>
                <Text style={styles.modalTitle}>
                  {this.state.currentArea.name}
                </Text>
              </View>
              <View style={styles.topDj}>
                <View style={styles.topDjTitleContainer}>
                  <Text style={styles.topDjTitle}>Top DJ</Text>
                </View>
                <Image style={styles.topDjImg}
                  source={{ uri: this.state.topPlaylist.profile.avatar_url }} />
                <Text style={styles.topDjUserAndPlaylist}>{this.state.topPlaylist.profile.username}</Text>
              </View>
              {!this.state.submittedInThisArea ? <TouchableHighlight onPress={() => this.getUserPlaylists()} style={styles.submitPlaylistButton}>
                <Text style={styles.submitPlaylist}>Submit your own playlist!</Text>
              </TouchableHighlight> : <View style={styles.alreadySubmittedPlaylistContainer}>
                  <Text style={styles.alreadySubmittedPlaylist}>You've submitted a playlist here this week</Text>
                </View>}
              <View>
                <Text style={styles.leaderboard}>
                  Top Playlists of the Week
                </Text>
              </View>
              <View >
                {this.state.playlists.map(playlist => {
                  return <PlaylistModal currentArea={this.state.currentArea} playlist={playlist} key={playlist._id} />
                })}
              </View>
            </ScrollView>
            <View >
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalDismiss}>Back to the action</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={styles.modalMsg}>See Playlists in {this.state.currentArea.name}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#171738',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalTitle: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 15
  },
  modalDismiss: {
    color: 'white',
    marginBottom: 10,
    marginTop: 10
  },
  modalMsg: {
    color: 'white'
  },
  scrollView: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  topDj: {
    alignItems: 'center'
  },
  topDjTitleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  topDjTitle: {
    color: 'white',
    fontSize: 25
  },
  topDjUserAndPlaylist: {
    color: 'white',
    fontSize: 15
  },
  topDjImg: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderColor: 'green',
    borderWidth: 3,
    margin: 7
  },
  leaderboard: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  submitPlaylist: {
    padding: 10,
  },
  submitPlaylistButton: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 190,
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10
  },
  alreadySubmittedPlaylistContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 350,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 2,
    margin: 10
  },
  alreadySubmittedPlaylist: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'white',
    padding: 10
  }
});