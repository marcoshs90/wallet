import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import {
  HomePage,
  Transacoes,
  Enderecos,
  Faq,
  DetailsTrans,
  SideBar
} from "gc-pages";

const Drawer = DrawerNavigator(
  {
    Home: { screen: HomePage },
    Transacoes: { screen: Transacoes },
    Enderecos: { screen: Enderecos },
    Faq: { screen: Faq }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomePage },
    DetailsTrans: {
      path: "transacoes/:transacao",
      screen: DetailsTrans
    }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <AppNavigator />
  </Root>
);
