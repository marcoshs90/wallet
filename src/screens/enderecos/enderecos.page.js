import React, { Component } from "react"
import { View } from "react-native"
import { Spinner, Container, Content, List, ListItem, Text } from "native-base"
import { Grid, Row, Col } from "react-native-easy-grid"

import { GcHeader } from "gc-components"
import { EnderecoService } from "gc-services"

export class EnderecosPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      enderecos: []
    }

    this.enderecoService = new EnderecoService()
  }

  componentDidMount() {
    this.getEnderecos()
  }

  getEnderecos() {
    this.enderecoService.getEnderecos({ id: 1 }).then(enderecos => {
      this.setState({ enderecos, isLoading: false })
    })
  }

  back() {
    this.props.navigation.goBack()
  }

  adicionarEndereco() {
    this.setState({isLoading: true})
    this.enderecoService.novo({
      id: 1,
      isPrincipal: false,
      identificador: Math.random().toString(36).substring(7)
      // random string
    })
    .then((status) => this.getEnderecos())
  }

  renderPage() {
    if (this.state.isLoading) {
      return (
        <View style={{ padding: 20 }}>
          <Spinner />
        </View>
      )
    }

    return (
      <Content>
        <List
          dataArray={this.state.enderecos}
          renderRow={data => (
            <ListItem>
              <Grid>
                <Col>
                  <Text style={{ fontWeight: "bold" }}>{data.label}</Text>
                </Col>
                <Col>
                  <Text>{data.valor}</Text>
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
          backButton
          title="Endereços"
          navigation={this.props.navigation}
          rightButtons={[
            {
              icon: "add",
              transparent: true,
              onPress: () => this.adicionarEndereco()
            }
          ]}
        />

        {this.renderPage()}
      </Container>
    )
  }
}
