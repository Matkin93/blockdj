import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Modal, StyleSheet, ScrollView } from 'react-native';
import * as api from '../api';

export default class SubmitPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPlaylists: props.userPlaylists,
      backToAreaModal: props.backToAreaModal,
      modalVisible: props.modalVisible,
      currentArea: props.currentArea,
      username: props.username,
      handleSubmit: props.handleSubmit,
      loading: false,
      hasSubmittedPlaylist: false
    };
  }

  render() {
    const { userPlaylists, backToAreaModal, modalVisible, currentArea, username, hasSubmittedPlaylist, handleSubmit, loading } = this.state;
    if (loading) return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }} >
        <View style={styles.modal}>
          <View >
            <View style={styles.loadingContainer}>
              <Text style={styles.loading}>
                Loading
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    )
    else return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }} >
        <View style={styles.modal}>
          <ScrollView style={styles.scrollView}>
            <View>
              <Text style={styles.modalTitle}>
                Your Playlists
            </Text>
            </View>
            <View style={styles.noPLaylsitsContainer}>
              <Text style={styles.noPLaylsitsMsg}>
                Choose your playlist carefully
              </Text >
              <Text style={styles.noPLaylsitsMsg}>
                You only get one per area per week
            </Text>
            </View>
            <View>
              {userPlaylists.map(playlist => {
                return <View key={playlist._id}>
                  <TouchableHighlight onPress={() => this.submitPlaylist(currentArea, playlist, username, handleSubmit, backToAreaModal)}>
                    <View style={styles.playlistContainer}>
                      <Text style={styles.playlistName}>{playlist.name}</Text>
                      <Text style={styles.playlistLength}> • {playlist.tracks.length} songs</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              })}
            </View>
          </ScrollView>
          <View >
            <TouchableHighlight
              onPress={() => {
                backToAreaModal();
              }}>
              <Text style={styles.modalDismiss}>Back</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }

  submitPlaylist = (currentArea, playlist, username) => {
    playlist.area = currentArea._id;
    playlist.profile = username;
    delete playlist._id;
    delete playlist.created_at;

    this.setState({
      loading: true
    }, () => {
      api.postPlaylist(playlist)
        .then((playlistDoc) => {
          const { playlist } = playlistDoc.data;
          this.state.handleSubmit(playlist);
          setTimeout(() => {
            this.state.backToAreaModal();
          }, 2000)
        })
        .catch(console.log)
    })
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
    marginBottom: 40,
    fontWeight: 'bold',
  },
  modalDismiss: {
    color: 'white',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 17
  },
  modalMsg: {
    color: 'white'
  },
  scrollView: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  playlistContainer: {
    marginTop: 20
  },
  playlistName: {
    color: 'white',
    fontSize: 22
  },
  playlistLength: {
    color: 'grey',
    fontSize: 17
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loading: {
    color: 'white',
    fontSize: 50,
  },
  noPLaylsitsContainer: {
    alignItems: 'center',
    borderColor: 'white',
  },
  noPLaylsitsMsg: {
    color: 'white',
    fontSize: 18,
    margin: 5
  }
});