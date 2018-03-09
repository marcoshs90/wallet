import React, { Component } from "react"
import { Dimensions, TouchableOpacity, View, Image } from "react-native"
import { Container, Text, Button } from "native-base"

import EventEmitter from 'sm-event-emitter'

import EStyleSheet from "react-native-extended-stylesheet";

import { GcHeader, GcInput } from "gc-components"
import { AuthService } from "gc-services"

export class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      senha: ''
    }

    this.authService = new AuthService()
  }

  doLogin() {
    this.authService.doLogin({email: this.state.email, password: this.state.senha})
  }

  render() {
    return (
      <Container style={styles.container}>

        <View style={{flexDirection: 'row', padding: 20}}>
          <Image style={{resizeMode: 'contain', flex: 1}} source={require("../../../assets/logo.png")} />
        </View>


        <View style={{padding: 20, paddingBottom: 0}}>
          <GcInput
            label="Usuário"
            ref={c => (this.email = c)}
            value={this.state.email}
            labelWidth={80}
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
          />

          <GcInput
            label="Senha"
            ref={c => (this.senha = c)}
            value={this.state.senha}
            labelWidth={80}
            onChangeText={text => this.setState({ senha: text })}
            password
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Button full onPress={() => this.doLogin()}>
            <Text>Entrar</Text>
          </Button>
        </View>

      </Container>
    )
  }
}


const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$primary',
    paddingTop: 40
  }
})
