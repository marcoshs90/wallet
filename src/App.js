import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from "./screens/home/";
import Transacoes from "./screens/transacoes/";
import Enderecos from "./screens/enderecos/";
import Faq from "./screens/faq/";

import DetailsTrans from "./screens/detailsTransacoes/";

import SideBar from "./screens/sidebar";

const Drawer = DrawerNavigator(
  {
   Home: { screen: Home },
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
    Drawer: { screen: Drawer },
    DetailsTrans: {
      path: 'transacoes/:transacao',
      screen: DetailsTrans
    }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
