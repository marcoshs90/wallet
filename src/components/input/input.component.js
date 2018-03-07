import React, { PureComponent } from 'react'
import { Text, View, TextInput, Animated, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { TextInputMask } from 'react-native-masked-text'
import { Icon } from 'native-base'

export class GcInput extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      actived: false,
      height: new Animated.Value(25),
      text: '',
      valid: true,
      showErrors: false,
      message: '',
      showPassword: false,
      autoFocus: false,
    }
  }

  getRawValue() {
    return this.campo.getRawValue()
  }

  _renderInputComponent() {
    if(this.props.mask) {
      return (
        <TextInputMask
          type={this.props.mask.type}
          options={this.props.mask.options}
          ref={(c) => this.campo = c}
          style={[styles.inputElement, this.state.showErrors === true ? { opacity: 0 } : {}, this.props.disabled ? {color: 'rgba(0,0,0,0.4)'} : {}]}
          autoCorrect={false}
          secureTextEntry={this.state.showPassword ? false : this.props.password || false}
          autoCapitalize={this.props.keyboardType === 'email-address' ? 'none' : 'sentences'}
          onChangeText={(text) => this._change(text)}
          value={this.state.text}
          autoFocus={this.props.autoFocus}
          underlineColorAndroid={'transparent'}
          editable={!this.props.disabled}
          placeholder={this.props.placeholder || ''}
          placeholderColor={'#777'}
        />
      )
    }

    return (
      <TextInput
      ref={(c) => this.campo = c}
      style={[styles.inputElement, this.state.showErrors === true ? { opacity: 0 } : {}, this.props.disabled ? {color: 'rgba(0,0,0,0.4)'} : {}]}
      autoCorrect={false}
      secureTextEntry={this.state.showPassword ? false : this.props.password || false}
      autoCapitalize={'none'}
      keyboardType={this.props.keyboardType || 'default'}
      onChangeText={(text) => this._change(text)}
      value={this.state.text}
      autoFocus={this.props.autoFocus}
      underlineColorAndroid={'transparent'}
      editable={!this.props.disabled}
      placeholder={this.props.placeholder || ''}
      placeholderColor={'#777'}
    />
    )
  }

  _change(text) {
    this.setState({ text })

    if(this.props.onChangeText){
      this.props.onChangeText(text)
    }
  }

  _renderShowPassword() {
    return (
      <TouchableOpacity
        onPress={() => this.setState({showPassword: !this.state.showPassword})}
        style={[styles.iconContainer, {marginRight: 5}]}>
        {
          this.props.showPassword
          ? <Icon name="eye-off" size={20} style={{color: '#ccc'}} />
          : <Icon name="eye" size={20} style={{color: '#ccc'}} />
        }
      </TouchableOpacity>
    )
  }

  _renderIcon() {
    if(this.state.text.length) {
      return (
        <View style={{flexDirection: 'row'}}>
          {this.props.password ? this._renderShowPassword() : null}
          <TouchableOpacity onPress={() => this._change('')} style={styles.iconContainer}>
            <Icon name="close" size={20} style={{color: '#ccc'}} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.iconContainer}>
        {this.props.icon && <Icon name={this.props.icon} size={20} style={{color: '#ccc'}} />}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.group}>
        <TouchableWithoutFeedback onPress={() => this.campo.focus()}>
          <View style={[styles.labelGroup, {width: this.props.labelWidth || 180}]}>
            <Text style={{fontSize: 16, paddingLeft: 5, color: '#999'}}>{this.props.label}</Text>
          </View>
        </TouchableWithoutFeedback>
        {this._renderInputComponent()}
        {this._renderIcon()}
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  group: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 3,
    marginBottom: 20,
  },
  labelGroup: {
    justifyContent: 'center',
    paddingRight: 15,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  inputElement: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
  }
})
