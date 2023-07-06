import {createTheme} from '@mui/material'

export const theme = (palette) => {
    const customTheme = createTheme()
    const customPalette = palette(customTheme);
    console.log('customPalette', customPalette.primary.main)
    return {
        ...customTheme,
        palette: customPalette,
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        fontFamily: 'Fira Sans, sans-serif',
                        fontSize: '1.6rem',
                        backgroundColor: customPalette.background.default,
                    },
                    html: {
                        fontSize: '62.5%',
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    paragraph: {
                        fontSize: '20px',
                        marginBottom: '50px',
                        letterSpacing: '5px',
                        textAlign: 'center',
                        opacity: '0.5',
                    }
                }
            },
            MuiButton: {
                defaultProps: {
                    variant: "contained",
                    color: "secondary"
                }
            },
            MuiLabel: {
                styleOverrides: {
                    root: {
                        backgroundColor: customPalette.primary.main,
                        color: customPalette.text.secondary,

                    }
                }
            },
            MuiLink: {
                defaultProps: {
                    underline: "hover",
                    variant: "button",
                    color: "secondary",
                    component: "button"
                }
            },
            MuiSelect:{
                styleOverrides: {
                    root: {
                        width: "300px",
                        fontSize: "18px",
                        display: "flex",
                        textDecoration: "none",
                        justifyContent: "center",
                        textAlign: "center",
                        alignItems: "center",
                        height: "45px",
                        paddingLeft: "5px",
                        border: "none",
                        margin: "6px",
                        textAlignLast: "center",
                        outline: "none",
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: '#e5e5e5',
                        '.MuiOutlinedInput-notchedOutline': {border: 0},

                    }
                }
            }
        },
        // TODO: Add breakpoints
        // breakpoints: {
        //     values: {
        //         xs: 300,
        //         sm: 600,
        //         md: 767,
        //         lg: 1200,
        //         xl: 1536
        //     }
        // }
    }
}
