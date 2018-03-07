import React, { Component } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Container, Text, Button, Spinner } from "native-base";

import EventEmitter from "sm-event-emitter";

import { GcHeader } from "gc-components";
import { EnderecoService } from "gc-services";

import EStyleSheet from "react-native-extended-stylesheet";

import QRCode from "react-native-qrcode";

const { width } = Dimensions.get("window");

export class EnderecoDetailPage extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;

    console.log(this.props);

    this.state = {
      endereco: params.endereco,
      isLoading: false
    };

    this.enderecoService = new EnderecoService();
  }

  static navigationOptions = {
    title: "Home..."
  };

  getEnderecos() {
    this.enderecoService.getEnderecos({ id: 1 }).then(enderecos => {
      EventEmitter.emit('ATUALIZAR_ENDERECOS', enderecos)
      enderecos.forEach(end => {
        if (end.endereco === this.state.endereco.endereco) {
          this.setState({ endereco: end, isLoading: false });
        }
      });
    });
  }

  arquivar() {
    this.setState({ isLoading: true });
    this.enderecoService
      .arquivar({ id: 1, address: this.state.endereco.endereco })
      .then(() => this.getEnderecos());
  }

  desarquivar() {
    this.setState({ isLoading: true });
    this.enderecoService
      .desarquivar({ id: 1, address: this.state.endereco.endereco })
      .then(() => this.getEnderecos());
  }

  action() {
    if (this.state.endereco.arquivado) {
      return (
        <Button full onPress={() => this.desarquivar()}>
          <Text>Desarquivar</Text>
        </Button>
      );
    }

    return (
      <Button full onPress={() => this.arquivar()}>
        <Text>Arquivar</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <GcHeader
          backButton
          title={"Endereço"}
          navigation={this.props.navigation}
        />

        {!this.state.isLoading ? (
          <View style={{ backgroundColor: "#fff", padding: 20 }}>
            <View style={{ paddingBottom: 20 }}>
              <Text style={{ fontSize: 20, marginBottom: 2 }}>
                {this.state.endereco.label}
              </Text>
              <Text style={{ fontSize: 14 }}>
                {this.state.endereco.endereco}
              </Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {!this.state.endereco.arquivado ? (
                <QRCode
                  value={this.state.endereco.endereco}
                  size={width - 40}
                  bgColor="black"
                  fgColor="white"
                />
              ) : null}
            </View>

            <View style={{ paddingVertical: 20, flexDirection: "row" }}>
              <Text style={{ fontSize: 14, marginBottom: 2 }}>Status: </Text>
              <Text style={{ fontSize: 14 }}>
                {this.state.endereco.arquivado ? "Arquivado" : "Ativo"}
              </Text>
            </View>

            {this.action()}
          </View>
        ) : (
          <View style={{ padding: 20 }}>
            <Spinner small />
          </View>
        )}
      </Container>
    );
  }
}
