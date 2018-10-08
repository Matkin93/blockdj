import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight, Image, ScrollView } from 'react-native';
import PlaylistModal from './PlaylistModal';

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
      loading: true
    };
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
                <Text style={styles.topDjUserAndPlaylist}>{this.state.topPlaylist.profile.username}</Text>
                <Image style={styles.topDjImg}
                  source={{ uri: this.state.topPlaylist.profile.avatar_url }} />
                <Text style={styles.topDjUserAndPlaylist}>With: {this.state.topPlaylist.name}</Text>
              </View>
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
    marginBottom: 20,
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
    fontSize: 20
  },
  topDjImg: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderColor: 'green',
    borderWidth: 3
  },
  leaderboard: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 10
  }
});