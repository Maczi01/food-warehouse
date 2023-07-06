
export const lightTheme = (config) => ({
    ...config.palette,
    mode: 'light',
    primary: {
        main: '#00214D',
        light: '#2D5283',
        dark: '#001423',
        contrastText: '#fff',
    },
    secondary: {
        main: '#FDE24F',
        light: '#ffed8b',
        dark: '#af930f',
        contrastText: '#00214d',
    },
    text: {
        primary: '#00214d',
        secondary: '#fff',
        disabled: '#57657b',
    },
    error: {
        main: '#FF5470',
        light: '#fb7186',
        dark: '#fd0d35',
        contrastText: '#ffffff',
    },
    warning: {
        main: '#FF5470',
        light: '#fb7186',
        dark: '#fd0d35',
        contrastText: '#ffffff',
    },
    success: {
        main: '#00EBC7',
        light: '#65fde7',
        dark: '#009d85',
        contrastText: '#ffffff',
    },
    info: {
        main: '#00a4eb',
        light: '#46c7ff',
        dark: '#0787c0',
        contrastText: '#ffffff',
    },
    background: {
        default: '#FFFFFE',
        paper: '#ffffff',
    }
})
