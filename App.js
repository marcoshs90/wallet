import React, { Component } from 'react'
import { Root } from 'native-base'
import { StackNavigator, DrawerNavigator } from 'react-navigation'

import {
  HomePage,
  Transacoes,
  Enderecos,
  Faq,
  SideBar,
  DashboardPage
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


const Drawer = DrawerNavigator(
  {
    Home: { screen: DashboardPage },
    Transacoes: { screen: Transacoes },
    Enderecos: { screen: Enderecos },
    Faq: { screen: Faq }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideBar {...props} />
  }
)

const AppNavigator = StackNavigator(
  {
    Home: { screen: Drawer }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
)
