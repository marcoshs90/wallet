import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { Container, Text } from "native-base"

import { GcHeader } from "gc-components"
import { EnderecoService } from "gc-services"

import EStyleSheet from "react-native-extended-stylesheet"

export class TransacoesDetailPage extends Component {
  constructor(props) {
    super(props)

    const { params } = this.props.navigation.state;

    this.state = {
      transacao: params.transacao
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
    this.props.navigation.navigate('Enderecos2')
  }

  renderLine(label, value) {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 15, borderTopWidth: 1, borderColor: '#ddd', justifyContent: 'center'}}>
        <View style={{paddingRight: 20}}><Text>{label}</Text></View>
        <View style={{flex: 1}}><Text style={{fontSize: 12, color: '#555', textAlign: 'right'}}>{value}</Text></View>
      </View>
    )
  }

  render() {

    const { transacao } = this.state

    return (
      <Container>
        <GcHeader
          backButton
          title="Detalhe"
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


        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <View style={{flex: 1, paddingBottom: 8}}>
              <Text style={{fontSize: 24}}>{this.state.transacao.tipo == 1
                          ? "RECEBIDO"
                          : this.state.transacao.tipo == 2
                            ? "ENVIADO"
                            : this.state.transacao.tipo == 3
                              ? "COMPRA"
                              : this.state.transacao.tipo == 4
                                ? "VENDA"
                                : this.state.transacao.tipo == 5 ? "REQUISIÇÃO" : ""}</Text>
            </View>
            <View>
              <Text style={{fontSize: 24}}>{this.state.transacao.valor}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <View style={{flex: 1, alignItems: 'flex-end' }}>
              <Text style={{fontSize: 14, color: '#777'}}>Valor quando enviado: {transacao.valorreal}</Text>
              <Text style={{fontSize: 14, color: '#777'}}>Taxa de transação: {transacao.comissao}</Text>
            </View>
          </View>

          {this.renderLine('Carteira', transacao.carteira)}
          {this.renderLine('Carteira', transacao.carteira)}
        </View>



      </Container>
    )
  }
}
