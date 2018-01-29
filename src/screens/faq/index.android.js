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

class Faq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://apiwigool.herokuapp.com/api/faq', {
                  method: 'GET',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.faq,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
            <Title style={styles.escritaBranca}>FAQ</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem>
                <Grid>
                  <Row>
                    <Left><Text style={styles.perguntas}>{data.pergunta}</Text></Left>
                  </Row>
                  <Row>
                    <Left><Text style={styles.respostas}>{data.resposta}</Text></Left>
                  </Row>
                </Grid>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default Faq;
