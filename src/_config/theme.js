import EStyleSheet from 'react-native-extended-stylesheet'

const PRIMARY_COLOR   = '#025274'

const BLACK = '#000000'
const WHITE = '#ffffff'

export class ConfigTheme {
  static build() {
    EStyleSheet.build({
      $black: BLACK,
      $white: WHITE,
      $primary: PRIMARY_COLOR,
    })
  }
}
