import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Body,
  Badge
} from "native-base";
import styles from "./style";
import { Row } from "react-native-easy-grid";

import EventEmitter from 'sm-event-emitter'

const drawerImage = require("../../../assets/logo.png");
const datas = [
  {
    name: "Dashboard",
    route: "DashboardPage",
    icon: "speedometer",
    bg: "#C5F442"
  },
  {
    name: "Transações",
    route: "TransacoesPage",
    icon: "cash",
    bg: "#C5F442"
  },
  {
    name: "Endereços",
    route: "EnderecosPage",
    icon: "qr-scanner",
    bg: "#C5F442"
  },
  {
    name: "FAQ",
    route: "FaqPage",
    icon: "help-circle",
    bg: "#C5F442"
  },
  {
    name: "Sair",
    icon: "ios-power",
    bg: "#C5F442",
    onPress: () => EventEmitter.emit('SUCCESS_LOGOUT')
  },
];

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          <Row style={styles.drawerCover} >
            <Image style={styles.drawerImage} source={drawerImage} />
          </Row>

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => data.onPress ? data.onPress() : this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}
