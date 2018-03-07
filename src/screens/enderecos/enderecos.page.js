import React, { Component } from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import {
  Spinner,
  Container,
  Content,
  List,
  Left,
  ListItem,
  Text,
  Icon,
  Button,
  ActionSheet,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid';

import EventEmitter from "sm-event-emitter";

import { GcHeader } from 'gc-components';
import { EnderecoService } from 'gc-services';

export class EnderecosPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      enderecos: [],
      showNovoEnderecoModal: false,
      endereco: ''
    };

    this.enderecoService = new EnderecoService();
    EventEmitter.on('ATUALIZAR_ENDERECOS', (enderecos) => {
      this.setState({enderecos})
    })
  }

  componentDidMount() {
    this.getEnderecos();
  }

  getEnderecos() {
    this.enderecoService.getEnderecos({ id: 1 }).then(enderecos => {
      this.setState({ enderecos, isLoading: false });
    });
  }

  back() {
    this.props.navigation.goBack();
  }

  showModal() {
    this.setState({showNovoEnderecoModal: true})
  }

  adicionarEndereco() {
    this.setState({ isLoading: true, showNovoEnderecoModal: false });
    this.enderecoService
      .novo({
        id: 1,
        isPrincipal: false,
        identificador: this.state.endereco
      })
      .then(status => this.getEnderecos());
  }

  showOptions(item) {
    let BUTTONS = [
      { text: 'Sacar' },
      { text: 'Receber' },
      { text: 'Arquivar' },
      { text: 'Voltar' }
    ];


    if(item.arquivado) {
      BUTTONS = [
        { text: 'Desarquivar' },
        { text: 'Voltar' }
      ];
    }

    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: BUTTONS.length -1,
        title: item.label
      },
      buttonIndex => {

        if(item.arquivado) {
          if(buttonIndex === 0) {
            this.enderecoService.desarquivar({id: 1, address: item.endereco})
              .then(() => this.getEnderecos())
          }
        } else {
          if(buttonIndex === 0) {
            alert('Sacar!')
          }

          if(buttonIndex === 1) {
            this.detailPage(item)
          }

          if(buttonIndex === 2) {
            this.enderecoService.arquivar({id: 1, address: item.endereco})
              .then(() => this.getEnderecos())
          }
        }
      }
    );
  }

  detailPage(item) {
    this.props.navigation.navigate('EnderecoDetailPage', {endereco: item})
  }

  renderItem(item, index) {
    return (
      <ListItem onPress={() => this.detailPage(item)}>
        <Left style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
          {item.arquivado ? <Icon style={{ fontSize: 25, color: '#555', marginLeft: 10}} name='archive' /> : null}
        </Left>
        <View>
          <Text>{item.valor}</Text>
        </View>
        <TouchableOpacity onPress={() => this.showOptions(item)} style={{padding: 5, paddingHorizontal: 10, marginLeft: 10}}>
          <Icon style={{ fontSize: 20, color: '#555' }} name='more' />
        </TouchableOpacity>
      </ListItem>
    );
  }

  renderPage() {
    if (this.state.isLoading) {
      return (
        <View style={{ padding: 20 }}>
          <Spinner />
        </View>
      );
    }

    return (
      <Content>
        <List
          dataArray={this.state.enderecos}
          renderRow={(data, index) => this.renderItem(data, index)}
        />
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title='Endereços'
          navigation={this.props.navigation}
          rightButtons={[
            {
              icon: 'add',
              transparent: true,
              onPress: () => this.showModal()
            }
          ]}
        />

        {this.renderPage()}

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showNovoEnderecoModal}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
            <View style={{padding: 20, borderRadius: 3, backgroundColor: '#fff', marginRight: 20, width: 300}}>
              <View style={{paddingBottom: 15}}>
                <Text style={{fontSite: 16}}>Informe o nome do novo endereço que você quer adicionar.</Text>
              </View>

              <Item stackedLabel>
                <Label>Novo endereço</Label>
                <Input
                  onChangeText={(text) => this.setState({endereco: text})}
                  value={this.state.endereco}
                />
              </Item>

              <View style={{flexDirection: 'row', paddingTop: 20}}>
                <Button
                  success
                  disabled={this.state.endereco.length < 3}
                  style={{marginRight: 10}}
                  onPress={() => this.adicionarEndereco()}>
                  <Text>Adicionar</Text>
                </Button>

                <Button
                  onPress={() => {
                    this.setState({showNovoEnderecoModal: !this.state.showNovoEnderecoModal, endereco: ''});
                  }}>
                  <Text>Cancelar</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>

      </Container>
    );
  }
}
