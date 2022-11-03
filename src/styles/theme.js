import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    fonts: {
        body: '`Open Sans`, sans-serif',
        heading: '`Open Sans`, sans-serif',
    },
    colors: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
            50: '#F3F3F3',
            100: '#F3F3F3',
            200: '#E8E8E8',
            300: '#BDC0BC',
            400: '#888E88',
            500: '#747775',
            600: '#5D675F',
        },
        primary: {
            50: '#E1EEE2',
            100: '#D5FED9',
            200: '#CFF7D3',
            300: '#C5E8C8',
            500: '#F15a24',
            600: '#F15a24',
            700: '#F15a24',
            900: '#F15a24',
        },
        secondary: {
            25: '#A5BD5F40',
            500: '#A5BD5F',
            600: '#9CB259',
            700: '#8B9E4D',
            800: '#6A8814',
        },
        error: {
            500: '#D62222',
            600: '#C41D1D',
            700: '#AD1A1A',
        },
        yellow: {
            500: '#EDA822',
        },
        lightBlue: {
            500: '#6FC4FD',
        },
     
        green: {
            500: '#00D563',
        },

        background: '#FEFEFE',
        backgroundGray: '#F5F5F5',
    },
    components:{
        
    }
   
});