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

class Enderecos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://apiwigool.herokuapp.com/api/enderecos', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    id: 12,
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
            <Title style={styles.escritaBranca}>Endereços</Title>
          </Body>
          <Right>
            <Icon style={styles.botao} name="add" />
          </Right>
        </Header>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={data =>
              <ListItem>
                <Grid>
                  <Col>
                    <Text style={{fontWeight: "bold"}}>{data.label}</Text>
                  </Col>
                  <Col>
                    <Body><Text>{data.valor}</Text></Body>
                  </Col>
                </Grid>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default Enderecos;
