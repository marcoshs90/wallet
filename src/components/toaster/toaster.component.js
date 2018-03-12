import React, { Component } from 'react'
import {
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { ToasterService } from 'gc-services'
import { Icon, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import EventEmitter from 'sm-event-emitter'

import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')

const TOASTER_HEIGHT = 100
const TOASTER_TIME = 4000

const PROP_TYPES = {
  message: PropTypes.string
}

const DEFAULT_PROPS = {
  message: 'Aconteceu um erro inesperado'
}

export class GcToaster extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: 0,
      message: '',
      type: ''
    }

    this.top = new Animated.Value(-TOASTER_HEIGHT)

    this._toasterEventId = EventEmitter.on(ToasterService.TYPES.SHOW, (data) => this._show(data))
  }

  _show(data) {

        this.setState({type: data.type, message: data.message})

        Animated.timing(this.top, { toValue: 0, duration: 300 }).start()

        setTimeout(() => {
            this._hide()
        }, TOASTER_TIME)
    }

    _hide() {
        Animated.timing(this.top, { toValue: -TOASTER_HEIGHT, duration: 200 }).start()
    }

  _close() {
    this._hide()
  }

  _onPress() {

    if (this.props.onPress) {
      this._close()
      this.props.onPress()
    }
  }

  _renderComponent() {
    if (!this.state.hidden) {
      return (
        <TouchableWithoutFeedback onPress={() => this._onPress()}>
          <Animated.View
            style={[
              styles.container,
              this.state.type === ToasterService.TYPES.WARNING ? styles.warning : {},
              this.state.type === ToasterService.TYPES.ERROR ? styles.error : {},
              this.state.type === ToasterService.TYPES.SUCCESS ? styles.success : {},
              this.state.type === ToasterService.TYPES.NORMAL ? styles.normal : {},
            ]}>
            <View style={{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}>

            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 15, paddingTop: 15}}>
              <Text bold size={16} style={{ color: '#fff', textAlign: 'center' }}>
                {this.state.message}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this._close()} style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
              <Icon style={{color: 'rgba(255,255,255,0.5)'}} size={20} name='close' />
            </TouchableOpacity>
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    }
  }

  render() {
    return (
      <Animated.View style={{position: 'absolute', zIndex: 201, top: this.top, padding: 10, flexDirection: 'row', paddingTop: 25}}>
        {this._renderComponent()}
      </Animated.View>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 6,
  },
  warning: {
    backgroundColor: '$messageAlert'
  },
  error: {
    backgroundColor: 'red'
  },
  success: {
    backgroundColor: '$messageSuccess'
  },
  normal: {
    backgroundColor: '$primary'
  },
  icon: {
    color: '#fff',
    marginRight: 8
  }
})

GcToaster.propTypes = PROP_TYPES
GcToaster.defaultProps = DEFAULT_PROPS
