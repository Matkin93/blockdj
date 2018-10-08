import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';

export default class PlaylistModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      playlist: props.playlist
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
              <Text style={styles.modalTitle}>
                {this.state.playlist.name}
              </Text>
            </View>
            <View >
              {this.state.playlist.tracks.map(track => {
                return <View key={track._id}>
                  <Text>{track.title}</Text>
                  <Text>{track.artist}</Text>
                  <Text>{track.album}</Text>
                </View>
              })}
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
  modalTitle: {
    color: 'white',
    fontSize: 30,
    marginTop: 30
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
    marginBottom: 7,
    color: 'grey'
  },
});
