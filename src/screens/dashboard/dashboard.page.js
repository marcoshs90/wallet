import React, { Component } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { Container, Text } from "native-base"

import { GcHeader } from "gc-components"
import { EnderecoService } from "gc-services"

import EStyleSheet from "react-native-extended-stylesheet"

export class DashboardPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.enderecoService = new EnderecoService()
  }

  static navigationOptions = {
    title: 'Home...'
  };

  onPress() {
    alert("clicou!")
  }

  vai() {
    console.log('aaa')
    this.props.navigation.navigate('Enderecos2')
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title="WIGOOL"
          navigation={this.props.navigation}
          rightButtons={[
            {
              title: "opa",
              icon: "qr-scanner",
              transparent: true,
              onPress: () => this.onPress()
            },
          ]}
        />

        <TouchableOpacity onPress={() => this.vai()}><Text>proxima</Text></TouchableOpacity>


        <Text>Dashboard</Text>
      </Container>
    )
  }
}
