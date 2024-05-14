import {useTheme} from '../context/ThemeContext';

const DefaultPalette = () => {
  const {theme} = useTheme();

  // ** Vars
  const whiteColor = '#FFF';
  const lightColor = '255, 255, 255';
  const darkColor = '86, 86, 95';
  const mainColor = lightColor;

  const primaryColor = '252, 128, 25';
  const secondaryColor = '247, 59, 46';

  return {
    customColors: {
      white: '#fff',
      dark: darkColor,
      main: mainColor,
      darkBg: '#7F909F',
      light: lightColor,
      lightBg: lightColor,
      bodyBg: '#eaf0fe',
      trackBg: '#F2F2F4',
      tooltipBg: '#262732',
      tableHeaderBg: '#F5F5F7',
    },
    common: {
      black: '#000',
      white: whiteColor,
      bottomBarBG: '#FC8019',
      switch: '#243070',
      gray: '#FAFAFA',
      gold: '#FFD700',
    },
    primary: {
      lightBG: `rgba(${primaryColor}, 0.2)`,
      light: '#FFC279',
      main: `rgba(${primaryColor}, 1)`,
      dark: '#C66213',
    },
    secondary: {
      lightBG: `rgba(${primaryColor}, 0.2)`,
      light: '#FF8676',
      main: `rgba(${secondaryColor}, 1)`,
      dark: '#BE2B20',
    },
    error: {
      lightBG: 'rgba(237, 30, 36, 0.2)',
      light: '#fa2d33',
      main: '#ED1E24',
      dark: '#c91c21',
    },
    warning: {
      lightBG: 'rgba(253, 181, 40, 0.2)',
      light: '#FDBE42',
      main: '#FDB528',
      dark: '#DF9F23',
    },
    info: {
      lightBG: 'rgba(38, 198, 249, 0.2)',
      light: '#40CDFA',
      main: '#26C6F9',
      dark: '#21AEDB',
    },
    success: {
      lightBG: 'rgba(54, 180, 130, 0.2)',
      light: '#CFEDE1',
      main: '#36B482',
      dark: '#278a62',
    },
    badges: {
      green: '#36B482',
      red: '#ED1E24',
    },
    linearGradient: {
      gold: ['#F6A113', '#F6DF69'],
      black: ['#1E1E1E', '#4F4F4F'],
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161',
      arrow: '#0D120E',
      light: 'lightgray',
      dark: 'gray',
      greyText: '#7f909f',
    },
    borders: {
      inputBorder: '#C4C4C4',
      borderSelected: '#ED1E24',
    },
    text: {
      text: theme === 'light' ? '#000' : '#fff',
      // text: '#000',
      primary: '#767676',
      secondary: '#243070',
      disabled: '#979797',
      grey: '#77838F',
      lightGrey: '#ECECEC',
      title: '#444445',
    },
    divider: 'rgba(236, 236, 236, 0.5)',
    background: {
      paper: '#fafcfc',
      inputBG: '#F7F7F7',
      table: '#28388F',
      paperGrey: '#E5E9EC',
      backdrop: 'rgba(0, 0, 0, 0.2)',
      bottomTab: '#FFC279',
    },
    buttons: {
      primary: `rgba(${primaryColor}, 1)`,
      secondary: `rgba(${secondaryColor}, 1)`,
    },
    labels: {
      primaryLabel: '#8C8C8C',
      secondaryLabel: '#56565E',
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.05)`,
      hoverOpacity: 0.05,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`,
    },
    shadow: {
      color: '#707070',
      paper: '#000',
    },
    skeleton: {
      backgroundColor: '#bdbdbd',
      highlightColor: '#e0e0e0',
    },
  };
};

export default DefaultPalette;
