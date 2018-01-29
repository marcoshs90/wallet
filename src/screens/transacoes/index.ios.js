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

class Transacoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://apiwigool.herokuapp.com/api/transacoes', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    tipo: 0,
                    id: 13,
                  })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  valoresTransacoes(tipo, valor){
    if(tipo == 1){
      return <Button full success><Text>{valor} BTC</Text></Button>;
    }else if(tipo == 2){
      return <Button full danger><Text>{valor} BTC</Text></Button>;
    }else if(tipo == 3){
      return <Button full info><Text>{valor} BTC</Text></Button>;
    }else if(tipo == 4){
      return <Button full warning><Text>{valor} BTC</Text></Button>;
    }else if(tipo == 5){
      return <Button full light><Text>{valor} BRL</Text></Button>;
    }
  }

  render() {
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
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon style={styles.botao} name="menu" />
            </Button>
          </Left>
          <Body>
            <Title style={styles.escritaBranca}>Transações</Title>
          </Body>
          <Right>
            <Icon style={styles.botao} name="qr-scanner" />
          </Right>
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem>
                <Grid>
                  <Col>
                    <Row>
                      <Left><Text style={{fontSize: 11}}>{data.data}</Text></Left>
                    </Row>
                    <Row>
                      <Left>
                        <Text style={{fontSize: 18, fontWeight: "bold"}}>
                          {
                            data.tipo == 1 ?
                            "RECEBIDO" :
                            (data.tipo == 2 ?
                             "ENVIADO" :
                             (data.tipo == 3 ?
                              "COMPRA" :
                              (data.tipo == 4 ?
                               "VENDA" :
                               (data.tipo == 5 ?
                                "REQUISIÇÃO" : "")
                              )
                             )
                            )
                          }
                        </Text>
                      </Left>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Body style={{right: 0}}>
                        {this.valoresTransacoes(data.tipo, data.valor)}
                      </Body>
                    </Row>
                  </Col>
                </Grid>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default Transacoes;
