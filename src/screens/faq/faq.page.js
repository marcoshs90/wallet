import React, { Component } from 'react'
import { View } from 'react-native'
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
} from 'native-base'
import { Grid, Row, Col } from 'react-native-easy-grid'
import EStyleSheet from 'react-native-extended-stylesheet'

import { GcHeader } from 'gc-components'
import { FaqService } from 'gc-services'

export class FaqPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      faq: []
    }

    this.faqService = new FaqService()
  }

  componentDidMount() {
    this.getFaq()
  }

  getFaq() {
    this.faqService.getFaq().then(faq => {
      this.setState({ faq, isLoading: false })
    })
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
          dataArray={this.state.faq}
          renderRow={data => (
            <ListItem>
              <Grid>
                <Row>
                  <Left>
                    <Text style={styles.perguntas}>{data.pergunta}</Text>
                  </Left>
                </Row>
                <Row>
                  <Left>
                    <Text style={styles.respostas}>{data.resposta}</Text>
                  </Left>
                </Row>
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
        <GcHeader showMenu title='FAQ' navigation={this.props.navigation} />
        {this.renderPage()}
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  mb: {
    marginBottom: 10
  },
  cabecalho: {
    backgroundColor: '#025274',
    height: 100
  },
  botao: {
    color: '#FFFFFF',
    marginTop: 0,
    fontSize: 30
  },
  escritaBranca: {
    color: '#FFFFFF',
    fontSize: 22
  },
  perguntas: {
    fontSize:18,
    fontWeight: 'bold'
  },
  respostas: {
    fontSize: 13
  }
})
