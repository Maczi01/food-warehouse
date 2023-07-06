
export const darkTheme = (config) => ({
    ...config.palette,
    mode: 'dark',
    secondary: {
        main: '#fde24f',
        light: '#D29F5E',
        dark: '#FFEDDC',
        contrastText: '#012B51',
    },
    primary: {
        main: '#012B51',
        light: '#00214D',
        dark: '#506680',
        contrastText: '#FDE24F',
    },
    text: {
        primary: '#FDE24F',
        secondary: '#00214D',
        disabled: '#A9AEB2',
    },
    error: {
        main: '#00AB90',
        light: '#048671',
        dark: '#00DACA',
        contrastText: '#00214D',
    },
    warning: {
        main: '#00AB90',
        light: '#048671',
        dark: '#00DACA',
        contrastText: '#00214D',
    },
    success: {
        main: '#FF3264',
        light: '#FF708B',
        dark: '#CE0043',
        contrastText: '#00214D',
    },
    info: {
        main: '#FF5502',
        light: '#FF8646',
        dark: '#D04300',
        contrastText: '#00214D',
    },
    background: {
        default: '#00214D',
        paper: '#001423',
    }
})
