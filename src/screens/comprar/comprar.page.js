import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View } from "react-native"
import { Container, Text, Input, Button, Item, Label, Picker, Icon } from "native-base"

import { GcHeader, GcInput } from "gc-components"
import { StorageService, EnderecoService, ToasterService } from "gc-services"

const { width } = Dimensions.get('window')

var _ = require('lodash')

export class ComprarPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      valor: '0,00',
      selected: '',
      usuario: {},
      enderecos: [],
      endereco: '',
      comissao: 0,
      porcentagemComissao: 0,
      valorFinal: 0,
      precoMedio: '0,00',
    }

    this.enderecoService = new EnderecoService();

    this.onChangeText = _.debounce(this.calcular, 500);
  }

  componentDidMount() {

    StorageService.getObject('usuario')
      .then(usuario => {
        this.setState({usuario})
        this.getCarteiras();
      })
  }

  calcular(text) {

    const valor = text.replace('R$', '')

    if(!parseInt(valor)) {

      this.setState({
          comissao: '0',
          valorFinal: '0',
          precoMedio: '0,00',
        })

      return false
    }

    this.setState({valor: text})
    this.enderecoService.calcularComissao(text.replace('R$', ''))
      .then(res => {
        this.setState({
          comissao: res.comissao,
          porcentagemComissao: res.porcentagemComissao,
          valorFinal: res.valorFinal,
          precoMedio: res.precoMedio,
        })
      })
  }

  comprar() {

    if(!this.state.endereco) {
      ToasterService.error('Selecione uma carteira')
      return false
    }

    if(this.valor.getRawValue() > 1) {

      const data = {
        id: this.state.usuario.id,
        endereco: this.state.endereco,
        quantidadereal: this.state.valor.replace('R$', ''),
        email: 'mhs_gs@hotmail.com'
      }

      this.enderecoService.comprar(data).then(res => {
        ToasterService.success('Compra realizada com sucesso!')
      });
    } else {
      ToasterService.error('Informe o valor')
    }
  }

  formatedMoney(valor) {
      if(!valor || !this.state.valor) {
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

  getCarteiras() {
    this.enderecoService.getCarteiras({id: this.state.usuario.id}).then(enderecos => {
      this.setState({ enderecos: enderecos.enderecos });
    });
  }


  onValueChange(value) {
    const endereco = this.state.enderecos[value].endereco
    this.setState({
      selected: value,
      endereco
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

  renderItem() {
    return this.state.enderecos.map((endereco, index) => {
      return (
        <Item label={endereco.label} value={index} key={index} />
      )
    })
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title="Comprar"
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
                {
                  this.renderItem()
                }
              </Picker>
            </View>

          <GcInput
            label="Valor"
            ref={c => (this.valor = c)}
            value={this.state.valor}
            mask={{ type: 'money' }}
            labelWidth={60}
            onChangeText={(text) => this.onChangeText(text)}
          />

          <View style={{paddingBottom: 20}}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Preço médio: </Text>
              <Text style={{ fontSize: 14 }}>{this.formatedMoney(this.state.precoMedio)}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Comissão: </Text>
              <Text style={{ fontSize: 14 }}>{this.state.comissao}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Receberá: </Text>
              <Text style={{ fontSize: 14 }}>{this.state.valorFinal}</Text>
            </View>
          </View>

          <Button
            success
            full
            onPress={() => this.comprar()}>
            <Text>Comprar</Text>
          </Button>
        </View>

      </Container>
    )
  }
}
