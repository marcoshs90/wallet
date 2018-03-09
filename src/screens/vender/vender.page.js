import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { Container, Text, Input, Button, Item, Label, Picker, Icon } from "native-base"

import { GcHeader, GcInput } from "gc-components"

const { width } = Dimensions.get('window')

export class VenderPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comissao: 0,
      selected: ''
    }
  }

  formatedMoney(valor) {

      if(!valor || !this.state.comissao) {
        valor = 0.00
      }

      return (
        'R$ ' +
        valor.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      )

    return children
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  renderHeader(backAction) {
    return (
      <View style={{paddingTop: 40, paddingBottom: 20, backgroundColor: '#f1f1f1', flexDirection: 'row', alignItems: 'center', paddingLeft: 20}}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18}}>Selecione uma conta</Text>
        </View>

        <Button transparent onPress={backAction}>
          <Icon name="close" style={{ color: '#555', fontSize: 36 }} />
        </Button>
      </View>
    )
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title="Vender"
          navigation={this.props.navigation}
        />

        <View style={{padding: 20, borderRadius: 3, backgroundColor: '#fff'}}>

            <View style={{flexDirection: 'row'}}>
              <Picker
                mode="dropdown"
                placeholder="Selecionar carteira"
                renderHeader={backAction => this.renderHeader(backAction)}
                selectedValue={this.state.selected}
                onValueChange={(value) => this.onValueChange(value)}
                style={{borderWidth: 1, borderColor: '#ddd', borderRadius: 3, marginBottom: 10, height: 52, width: width - 40}}
              >
                <Item label="Carteira 1" value="key1" />
                <Item label="Carteira 2" value="key2" />
                <Item label="Carteira 3" value="key3" />
                <Item label="Carteira 4" value="key4" />
              </Picker>
            </View>

          <GcInput
            label="BTC"
            ref={c => (this.comissao = c)}
            value={this.state.comissao}
            mask={{ type: 'money' }}
            labelWidth={60}
            onChangeText={text => this.setState({ comissao: text })}
          />

          <View style={{paddingBottom: 20}}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Preço médio: </Text>
              <Text style={{ fontSize: 14 }}>{this.formatedMoney(this.comissao ? this.comissao.getRawValue() * 0.05 : 0)}</Text>
            </View>

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
            <Text>Vender</Text>
          </Button>
        </View>

      </Container>
    )
  }
}
