import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight, Image } from 'react-native';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      playlist: props.playlist,
      handleLike: props.handleLike
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
              <Image style={styles.userImg}
                source={{ uri: this.state.playlist.profile.avatar_url }} />
            </View>
            <View >
              {this.state.playlist.tracks.map(track => {
                return <View key={track._id} style={styles.songContainer}>
                  <Text style={styles.title}>{track.title}</Text>
                  <Text style={styles.artist}>{track.artist} | {track.album}</Text>
                </View>
              })}
            </View>
            <View>
              <TouchableHighlight style={styles.upVoteButton} onPress={() => { this.state.handleLike() }}>
                <Text style={styles.upVote}>I like this playlist</Text>
              </TouchableHighlight>
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
          }}>
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playlistTitle: {
    color: 'white',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 7
  },
  votesTitle: {
    color: 'grey',
    fontSize: 15,
    alignSelf: 'center'
  },
  modalDismiss: {
    color: 'white',
    marginBottom: 20,
  },
  modalMsg: {
    color: 'white'
  },
  playlistInfo: {
    flex: 1,
    alignItems: 'center'
  },
  playlistName: {
    fontSize: 15,
    marginBottom: 7,
    color: 'white'
  },
  playlistVotes: {
    fontSize: 13,
    marginBottom: 2,
    color: 'grey'
  },
  title: {
    color: 'white',
    fontSize: 20
  },
  artist: {
    color: 'grey',
    fontSize: 15,
    marginBottom: 10
  },
  songContainer: {
    width: 300
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
  },
  upVoteButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    margin: 10
  },
});
