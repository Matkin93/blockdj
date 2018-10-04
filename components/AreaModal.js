import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';

export default class AreaModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      currentArea: props.currentArea,
      currentLocation: props.currentLocation
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
                {this.state.currentArea.name}
              </Text>
            </View>
            <View >
              <Text style={styles.modalDismiss}>
                {this.state.currentLocation.latitude}/{this.state.currentLocation.longitude}
              </Text>
            </View>
            <View >
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.modalDismiss}>Hide Modal</Text>
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
    fontSize: 30
  },
  modalDismiss: {
    color: 'white',
    marginBottom: 20,
  },
  modalMsg: {
    color: 'white'
  },
});