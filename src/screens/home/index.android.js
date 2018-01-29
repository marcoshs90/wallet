import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import styles from "./styles";

class Home extends Component {
  render() {
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
            <Title style={styles.escritaBranca}>WIGOOL</Title>
          </Body>
          <Right>
            <Icon style={styles.botao} name="qr-scanner" />
          </Right>
        </Header>
        <Content>

        </Content>
      </Container>
    );
  }
}

export default Home;
