import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight, Image, ScrollView, Linking } from 'react-native';
import * as api from '../api';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      playlist: props.playlist,
      handleLike: props.handleLike,
      hasVotedOnPlaylist: false
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  votePlaylist() {
    api.votePlaylist(this.state.playlist._id)
      .then(playlistDoc => {
        const newPlaylist = playlistDoc.data.playlist;
        newPlaylist.profile = this.state.playlist.profile;
        this.setState({
          playlist: newPlaylist,
          hasVotedOnPlaylist: true
        }, () => {
          this.state.handleLike();
        })
      })
  }

  openSpotify(url) {
    Linking.openURL(url);
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }} >
          <View style={{ marginTop: 22 }} style={styles.modal}>
            <View>
              <Text style={styles.playlistTitle}>
                {this.state.playlist.name}
              </Text>
              <Text style={styles.votesTitle}>
                {this.state.playlist.votes} points
              </Text>
            </View>
            <ScrollView>
              <View>
                <Image style={styles.userImg}
                  source={{ uri: this.state.playlist.profile.avatar_url }} />
                <Text style={styles.votesTitleA}>{this.state.playlist.profile.username}</Text>
              </View>
              <View style={styles.playlistContainer}>
                {this.state.playlist.tracks.map(track => {
                  return <TouchableHighlight onPress={() => this.openSpotify(this.state.playlist.playlist_url)} key={track._id}>
                    <View style={styles.songContainer}>
                      <Text style={styles.title}>{track.title}</Text>
                      <Text style={styles.artist}>{track.artist} | {track.album}</Text>
                    </View>
                  </TouchableHighlight>
                })}
              </View>
            </ScrollView>
            <View>
              {!this.state.hasVotedOnPlaylist ? <TouchableHighlight style={styles.upVoteButton} onPress={() => this.votePlaylist()}>
                <Text style={styles.upVote}>I like this playlist</Text>
              </TouchableHighlight> : <View style={styles.alreadyVotedContainer}>
                  <Text style={styles.alreadyVoted}>
                    You like this playlist
                  </Text>
                </View>
              }
            </View>
            <View >
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalDismiss}>Back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }} style={{ margin: 0, padding: 0 }}>
          <View style={styles.playlistInfo}>
            <Text style={styles.playlistName}>{this.state.playlist.name}</Text>
            <Text style={styles.playlistVotes}>{this.state.playlist.votes} points</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#171738',
    justifyContent: 'space-between',
  },
  playlistTitle: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 7,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  votesTitle: {
    color: 'grey',
    fontSize: 15,
    alignSelf: 'center'
  },
  votesTitleA: {
    color: 'grey',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 5
  },
  modalDismiss: {
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalMsg: {
    color: 'white',
    alignSelf: 'center',
  },
  playlistInfo: {
    paddingHorizontal: 10,
  },
  playlistName: {
    fontSize: 17,
    color: 'white'
  },
  playlistVotes: {
    fontSize: 15,
    color: 'grey'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  artist: {
    color: 'grey',
    fontSize: 13,
    marginBottom: 10
  },
  songContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 29,
    borderColor: 'white',
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: 7
  },
  upVote: {
    padding: 10,
    alignSelf: 'center',
  },
  upVoteButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    marginBottom: 10,
    width: 130,
    alignSelf: 'center',
  },
  playlistContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 3
  },
  alreadyVotedContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: 180,
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 2,
    margin: 10
  },
  alreadyVoted: {
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: 'green',
    padding: 10
  }
});
