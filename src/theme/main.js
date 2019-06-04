const colors = {
  blue: '#03A9F4',
  lime: '#0FCED1',
  green: '#4CAF50',
  red: '#FA0719',
  orange: '#FA7807',

  white: '#FFFFFF',
  white1: '#FCFCFE',
  gray: '#F5F5FA',
  gray1: '#D6D6DB',
  gray2: '#99999C',
  gray3: '#3D3D3E',
  gray4: '#1F1F1F',
}

const palette = {
  primary: colors.lime,
  secondary: colors.blue,
  warn: colors.orange,
  danger: colors.red,
  default: colors.gray3,
}


export const MainTheme = {
 colors: { ...colors },
  btnPrimary: {
    backgroundColor: palette.primary,
    color: colors.white,
  },
  btnSecondary: {
    backgroundColor: palette.secondary,
    color: colors.white,
  },
  btnWarn: {
    backgroundColor: palette.warn,
    color: colors.white,
  },
  btnDanger: {
    backgroundColor: palette.danger,
    color: colors.white,
  },
  gutters: {
    text: 20,
    image: 20,
    button: 20,
    heading: 20,
  },
  modal : {
    modal: {
      minWidth: 320,
      minHeight: 100,
    }
  },
  headingFour: {
    marginBottom: 15,
  },
  bodyText: {
    marginBottom: 15,
  }
}


