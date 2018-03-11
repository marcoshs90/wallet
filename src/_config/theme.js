import EStyleSheet from 'react-native-extended-stylesheet'

const PRIMARY_COLOR = '#025274'

const BLACK = '#000000'
const WHITE = '#ffffff'

const MESSAGE_SUCCESS    = '#6acf6a'
const MESSAGE_INFO       = '#96c8e5'
const MESSAGE_ALERT      = '#f98e2e'
const MESSAGE_DANGER     = '#e85454'
const MESSAGE_PRIMARY    = '#f68555'

export class ConfigTheme {
  static build() {
    EStyleSheet.build({
      $black: BLACK,
      $white: WHITE,
      $primary: PRIMARY_COLOR,
      $messageSuccess: MESSAGE_SUCCESS,
      $messageInfo: MESSAGE_INFO,
      $messageAlert: MESSAGE_ALERT,
      $messageDanger: MESSAGE_DANGER,
      $messagePrimary: MESSAGE_PRIMARY,
    })
  }
}
