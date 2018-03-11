import React, { Component } from "react";
import { View, Modal, ActivityIndicator } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import EventEmitter from "sm-event-emitter";

import { LoaderService } from 'gc-services'

import { Header, Title, Left, Right, Body, Button, Icon } from "native-base";

export class GcLoader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    }

    EventEmitter.on(LoaderService.EVENTS.SHOW, () => this._show())
    EventEmitter.on(LoaderService.EVENTS.HIDE, () => this._hide())
  }

  _show() {
    this.setState({isVisible: true})
  }

  _hide() {
    this.setState({isVisible: false})
  }


  render() {
    return (
      <Modal transparent animationType={'fade'} visible={this.state.isVisible}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </Modal>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    backgroundColor: "$primary",
    height: 100
  },
  escritaBranca: {
    width: 200,
    color: "$white",
    fontSize: 18
  },
  botao: {
    color: "$white",
    fontSize: 30
  }
});
