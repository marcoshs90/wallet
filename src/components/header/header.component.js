import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";

import { Header, Title, Left, Right, Body, Button, Icon } from "native-base";

export class GcHeader extends Component {

  componentDidMount() {
    console.log(this.props.navigation)
  }

  leftButtons() {
    if (this.props.left) {
      return this.props.left();
    }

    if (this.props.backButton) {
      return (
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon style={styles.botao} name="arrow-back" />
        </Button>
      );
    }

    if (this.props.showMenu) {
      return (
        <Button
          transparent
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Icon style={styles.botao} name="menu" />
        </Button>
      );
    }
  }

  renderRughtButtons() {

    if(!this.props.rightButtons) {
      return false
    }

    return this.props.rightButtons.map((button, index) => {
      return (
        <Button key={index} onPress={button.onPress} transparent={button.transparent}>
          <Icon style={styles.botao} name={button.icon} />
        </Button>
      )
    })
  }

  render() {
    return (
      <Header style={styles.header} {...this.props}>
        <Left>{this.leftButtons()}</Left>
        <Body>
          <Title style={styles.escritaBranca}>{this.props.title}</Title>
        </Body>
        <Right>{this.renderRughtButtons()}</Right>
      </Header>
    );
  }
}

const styles = EStyleSheet.create({
  header: {
    backgroundColor: "$primary",
    height: 100
  },
  escritaBranca: {
    color: "$white",
    fontSize: 22
  },
  botao: {
    color: "$white",
    fontSize: 30
  }
});
