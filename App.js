import React, { Component } from 'react'
import { Root } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import Reactotron from 'reactotron-react-native'

Reactotron
  .configure()
  .useReactNative()
  .connect()

import {
  TransacoesPage,
  EnderecosPage,
  FaqPage,
  SideBar,
  DashboardPage,
  TransacoesDetailPage,
} from 'gc-pages'

import { ConfigTheme } from 'gc-config'

export default class App extends Component {
  constructor() {
    super()

    // @description: disable yellow warning bottom box
    console.disableYellowBox = true

    ConfigTheme.build()
  }

  render() {
    return (
      <Root>
        <AppNavigator />
      </Root>
    )
  }
}

const navigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#2D2D2D',
    height: 100
  }
}

const Drawer = DrawerNavigator(
  {
    DashboardPage: { screen: DashboardPage },
    TransacoesPage: { screen: TransacoesPage },
    EnderecosPage: { screen: EnderecosPage },
    FaqPage: { screen: FaqPage }
  },
  {
    initialRouteName: 'DashboardPage',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    Enderecos2: { screen: EnderecosPage },
    TransacoesDetailPage: { screen: TransacoesDetailPage },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)
