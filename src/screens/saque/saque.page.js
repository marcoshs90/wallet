import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { Container, Text, Input, Button, Item, Label } from "native-base"

import { GcHeader, GcInput } from "gc-components"

export class SaquePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comissao: 0
    }
  }

  formatedMoney(valor) {
      return (
        'R$ ' +
        valor.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      )

    return children
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title="Saque"
          navigation={this.props.navigation}
        />

        <View style={{padding: 20, borderRadius: 3, backgroundColor: '#fff', marginRight: 20}}>

          <GcInput
            label="Valor"
            ref={c => (this.comissao = c)}
            value={this.state.comissao}
            mask={{ type: 'money' }}
            labelWidth={60}
            onChangeText={text => this.setState({ comissao: text })}
          />

          <View style={{paddingBottom: 20}}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Comissão: </Text>
              <Text style={{ fontSize: 14 }}>{this.formatedMoney(this.comissao ? this.comissao.getRawValue() * 0.05 : 0)}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Receberá: </Text>
              <Text style={{ fontSize: 14 }}>{this.formatedMoney(this.comissao ? this.comissao.getRawValue() - this.comissao.getRawValue() * 0.05 : 0)}</Text>
            </View>
          </View>

          <Button
            success
            full
            onPress={() => alert('Enviado')}>
            <Text>Sacar</Text>
          </Button>
        </View>

      </Container>
    )
  }
}
