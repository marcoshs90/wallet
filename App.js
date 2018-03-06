import React, { Component } from 'react'
import { Root, Icon } from 'native-base'
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

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
  EnderecoDetailPage,
  ComprarPage,
  SaquePage,
  VenderPage,
  TransferirPage,
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

const icons = {
    Comprar: 'ios-cart',
    Saque: 'ios-cash',
    Vender: 'ios-cloud-upload',
    Transferir: 'ios-exit',
  }


const Tabs = TabNavigator(
  {
    Comprar: { screen: ComprarPage },
    Saque: { screen: SaquePage },
    Vender: { screen: VenderPage },
    Transferir: { screen: TransferirPage },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName = `${icons[routeName]}${focused ? '' : '-outline'}`

        return <Icon name={iconName} size={25} style={{color: tintColor}} />
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#025274',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
)



const Drawer = DrawerNavigator(
  {
    DashboardPage: { screen: Tabs },
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
    EnderecoDetailPage: { screen: props => <EnderecoDetailPage {...props} /> },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none'
  }
)




