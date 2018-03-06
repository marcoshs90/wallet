import React, { Component } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { Container, Text } from "native-base"

import { GcHeader } from "gc-components"

export class TransferirPage extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title="Transferir"
          navigation={this.props.navigation}
        />
      </Container>
    )
  }
}
