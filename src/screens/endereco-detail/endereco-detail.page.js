import React, { Component } from "react"
import { Dimensions, TouchableOpacity } from "react-native"
import { Container, Text } from "native-base"

import { GcHeader } from "gc-components"
import { EnderecoService } from "gc-services"

import EStyleSheet from "react-native-extended-stylesheet"

export class EnderecoDetailPage extends Component {
  constructor(props) {
    super(props)


    const { params } = this.props.navigation.state;

    console.log(this.props)

    this.state = {
      endereco: params.endereco
    }

    this.enderecoService = new EnderecoService()
  }

  static navigationOptions = {
    title: 'Home...'
  };

  onPress() {
    // alert("clicou!")

    debugger

    this.enderecoService.novo({id: 1, isPrincipal: false, identificador: 'Foi? Palagem'})
  }

  vai() {
    console.log('aaa')
    this.props.navigation.navigate('EnderecoDetailPage')
  }

  render() {
    return (
      <Container>
        <GcHeader
          backButton
          title={this.state.endereco.label}
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

        <TouchableOpacity onPress={() => this.vai()}><Text>proxima</Text></TouchableOpacity>


        <Text>Dashboard</Text>
      </Container>
    )
  }
}
