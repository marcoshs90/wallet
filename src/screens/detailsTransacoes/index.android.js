import React, { Component } from "react";
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
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import styles from "./styles";

class DetailsTransacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  render() {
    const {state, goBack} = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <Spinner />
      );
    }

    return (
      <Container style={styles.container}>
        <Header style={styles.cabecalho}>
          <Left>
            <Button
              transparent
              onPress={() => goBack()}
            >
              <Icon style={styles.botao} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.escritaBranca}>Transação</Title>
          </Body>
          <Right>
            <Icon style={styles.botao} name="qr-scanner" />
          </Right>
        </Header>
        <Content>
          <ListItem>
            <Grid>
              <Col>
                <Row>
                  <Text style={{fontSize: 22, fontWeight: "bold"}}>
                    {
                      state.params.transacao.tipo == 1 ?
                      "RECEBIDO" :
                      (state.params.transacao.tipo == 2 ?
                       "ENVIADO" :
                       (state.params.transacao.tipo == 3 ?
                        "COMPRA" :
                        (state.params.transacao.tipo == 4 ?
                         "VENDA" :
                         (state.params.transacao.tipo == 5 ?
                          "REQUISIÇÃO" : "")
                        )
                       )
                      )
                    }
                  </Text>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Body>
                    <Text style={{fontSize: 18}}>
                      {state.params.transacao.valor != null ? state.params.transacao.valor : ""}
                      {
                        state.params.transacao.tipo == 1 ?
                        "  BTC" :
                        (state.params.transacao.tipo == 2 ?
                         "  BTC" :
                         (state.params.transacao.tipo == 3 ?
                          "  BTC" :
                          (state.params.transacao.tipo == 4 ?
                           "  BTC" :
                           (state.params.transacao.tipo == 5 ?
                            "  BRL" : "")
                          )
                         )
                        )
                      }
                    </Text>
                  </Body>
                </Row>
                <Row>
                  <Body>
                    <Text style={{fontSize: 14}}>
                      Taxa na transação
                      {state.params.transacao.comissao != null ? "  "+state.params.transacao.comissao : ""}
                      {
                        state.params.transacao.tipo == 1 ?
                        "  BTC" :
                        (state.params.transacao.tipo == 2 ?
                         "  BTC" :
                         (state.params.transacao.tipo == 3 ?
                          "  BTC" :
                          (state.params.transacao.tipo == 4 ?
                           "  BTC" :
                           (state.params.transacao.tipo == 5 ?
                            "  BRL" : "")
                          )
                         )
                        )
                      }
                    </Text>
                  </Body>
                </Row>
              </Col>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <Row>
                <Text style={{fontSize: 18}}>
                  De:
                </Text>
                <Text style={{fontSize: 12, left: 10}}>
                  {
                    state.params.transacao.tipo == 1 ?
                    state.params.transacao.terceiro :
                    (state.params.transacao.tipo == 2 ?
                     state.params.transacao.carteira+" (Minha)" :
                     (state.params.transacao.tipo == 3 ?
                      "" :
                      (state.params.transacao.tipo == 4 ?
                       state.params.transacao.carteira :
                       (state.params.transacao.tipo == 5 ?
                        state.params.transacao.carteira : "")
                      )
                     )
                    )
                  }
                </Text>
              </Row>
              <Row>
                <Text style={{fontSize: 18}}>
                  Para:
                </Text>
                <Text style={{fontSize: 12, left: 10}}>
                  {
                    state.params.transacao.tipo == 1 ?
                    state.params.transacao.carteira+" (Minha)" :
                    (state.params.transacao.tipo == 2 ?
                     state.params.transacao.terceiro :
                     (state.params.transacao.tipo == 3 ?
                      state.params.transacao.carteira :
                      (state.params.transacao.tipo == 4 ?
                       "" :
                       (state.params.transacao.tipo == 5 ?
                        state.params.transacao.email : "")
                      )
                     )
                    )
                  }
                </Text>
              </Row>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <Row>
                <Text style={{fontSize: 18}}>
                  Data:
                </Text>
                <Text style={{fontSize: 12, left: 10}}>
                  {state.params.transacao.data}
                </Text>
              </Row>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid>
              <Row>
                <Text style={{fontSize: 18}}>
                  Status:
                </Text>
                <Text style={{fontSize: 12, left: 10}}>
                  {
                    state.params.transacao.tipo == 1 || state.params.transacao.tipo == 2 ?
                      (state.params.transacao.status == 3 ? "Transação Completa" : "Transação Pendente") :
                      (state.params.transacao.tipo == 3 || state.params.transacao.tipo == 5 ?
                        (state.params.transacao.status == 0 ? "Aguardando" : (state.params.transacao.status == 1 ? "Completa" : "Cancelada")) :
                        (state.params.transacao.tipo == 4 ? "Completa" : "")
                      )
                  }
                </Text>
              </Row>
            </Grid>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

export default DetailsTransacoes;
