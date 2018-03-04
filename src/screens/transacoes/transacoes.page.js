import React, { Component } from "react"
import { View } from "react-native"
import {
  Spinner,
  Container,
  Content,
  Header,
  Title,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Text
} from "native-base"
import { Grid, Row, Col } from "react-native-easy-grid"

import { GcHeader } from "gc-components"
import { TransacoesService } from "gc-services"

export class TransacoesPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      transacoes: []
    }

    this.transacoesService = new TransacoesService()
  }

  componentDidMount() {
    this.getTransacoes()
  }

  getTransacoes() {
    this.transacoesService
      .getTransacoes({ id: 13, tipo: 0 })
      .then(transacoes => {
        this.setState({ transacoes, isLoading: false })
      })
  }

  valoresTransacoes(tipo, valor) {
    if (tipo == 1) {
      return (
        <Button full success>
          <Text>{valor} BTC</Text>
        </Button>
      )
    } else if (tipo == 2) {
      return (
        <Button full danger>
          <Text>{valor} BTC</Text>
        </Button>
      )
    } else if (tipo == 3) {
      return (
        <Button full info>
          <Text>{valor} BTC</Text>
        </Button>
      )
    } else if (tipo == 4) {
      return (
        <Button full warning>
          <Text>{valor} BTC</Text>
        </Button>
      )
    } else if (tipo == 5) {
      return (
        <Button full light>
          <Text>{valor} BRL</Text>
        </Button>
      )
    }
  }

  refresh() {
    this.setState({ isLoading: true })
    this.getTransacoes()
  }

  renderPage() {
    if (this.state.isLoading) {
      return (
        <View style={{ padding: 20 }}>
          <Spinner small />
        </View>
      )
    }

    return (
      <Content>
        <List
          dataArray={this.state.transacoes}
          renderRow={data => (
            <ListItem
              onPress={() =>
                this.props.navigation.navigate("TransacoesDetailPage", {
                  transacao: data
                })
              }
            >
              <Grid>
                <Col>
                  <Row>
                    <Left>
                      <Text style={{ fontSize: 11 }}>{data.data}</Text>
                    </Left>
                  </Row>
                  <Row>
                    <Left>
                      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {data.tipo == 1
                          ? "RECEBIDO"
                          : data.tipo == 2
                            ? "ENVIADO"
                            : data.tipo == 3
                              ? "COMPRA"
                              : data.tipo == 4
                                ? "VENDA"
                                : data.tipo == 5 ? "REQUISIÇÃO" : ""}
                      </Text>
                    </Left>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Body style={{ right: 0 }}>
                      {this.valoresTransacoes(data.tipo, data.valor)}
                    </Body>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </Row>
                </Col>
              </Grid>
            </ListItem>
          )}
        />
      </Content>
    )
  }

  render() {
    return (
      <Container>
        <GcHeader
          showMenu
          title={"Transações"}
          navigation={this.props.navigation}
          rightButtons={[
            {
              title: "opa",
              icon: "refresh",
              transparent: true,
              onPress: () => this.refresh()
            }
          ]}
        />

        {this.renderPage()}
      </Container>
    )
  }
}
