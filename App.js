import React, { Component } from "react";
import { Root, Icon } from "native-base";
import {
  StackNavigator,
  DrawerNavigator,
  TabNavigator,
  TabBarBottom
} from "react-navigation";

import Reactotron from "reactotron-react-native";

import EventEmitter from "sm-event-emitter";

Reactotron.configure()
  .useReactNative()
  .connect();

import {
  TransacoesPage,
  EnderecosPage,
  FaqPage,
  SideBar,
  DashboardPage,
  TransacoesDetailPage,
  EnderecoDetailPage,
  ComprarPage,
  SaquePage,
  VenderPage,
  TransferirPage,
  LoginPage
} from "gc-pages";

import { ConfigTheme } from "gc-config";
import { AuthService, StorageService } from "gc-services";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      token: "",
      isLoading: true
    };

    // @description: disable yellow warning bottom box
    console.disableYellowBox = true;

    this.authService = new AuthService();

    this.authService.init().then(token => {
      this.setState({ token, isLoading: false });
    });

    ConfigTheme.build();
    this._setListeners();
  }

  _setListeners() {
    EventEmitter.on("LOGIN_SUCCESS", token => {
      this.setState({ token });
    });

    EventEmitter.on("SUCCESS_LOGOUT", () => {
      StorageService.remove("sessionToken");
      this.setState({ token: "" });
    });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    if (this.state.token) {
      return (
        <Root>
          <AppNavigator />
        </Root>
      );
    } else {
      return (
        <Root>
          <LoginPage />
        </Root>
      );
    }
  }
}

const icons = {
  Comprar: "ios-cart",
  Saque: "ios-cash",
  Vender: "ios-cloud-upload",
  Transferir: "ios-exit"
};

const Tabs = TabNavigator(
  {
    Comprar: { screen: ComprarPage },
    Saque: { screen: SaquePage },
    Vender: { screen: VenderPage },
    Transferir: { screen: TransferirPage }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = `${icons[routeName]}${focused ? "" : "-outline"}`;

        return <Icon name={iconName} size={25} style={{ color: tintColor }} />;
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#025274",
      inactiveTintColor: "gray"
    },
    animationEnabled: false,
    swipeEnabled: false
  }
);

const Drawer = DrawerNavigator(
  {
    DashboardPage: { screen: Tabs },
    TransacoesPage: { screen: TransacoesPage },
    EnderecosPage: { screen: EnderecosPage },
    FaqPage: { screen: FaqPage }
  },
  {
    initialRouteName: "DashboardPage",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Enderecos2: { screen: EnderecosPage },
    TransacoesDetailPage: { screen: TransacoesDetailPage },
    EnderecoDetailPage: { screen: props => <EnderecoDetailPage {...props} /> }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);
