import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { Container, Text } from "native-base"

import { GcHeader } from "gc-components"
import { EnderecoService } from "gc-services"

import EStyleSheet from "react-native-extended-stylesheet"

import QRCode from 'react-native-qrcode'

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
        />

        <View style={{padding: 20}}>
          <Text>{this.state.endereco.endereco}</Text>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <QRCode
            value={this.state.endereco.endereco}
            size={250}
            bgColor='black'
            fgColor='white'/>
        </View>

      </Container>
    )
  }
}
