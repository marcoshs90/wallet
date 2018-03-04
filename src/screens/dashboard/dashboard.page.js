import React, { Component } from "react"
import { Dimensions } from "react-native"
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

  onPress() {
    // alert("clicou!")

    debugger

    this.enderecoService.novo({id: 1, isPrincipal: false, identificador: 'Foi? Palagem'})
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
            }
          ]}
        />

        <Text>Dashboard</Text>
      </Container>
    )
  }
}
