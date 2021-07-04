module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '1280px',
            xl: '1440px',
            xxl: '1920px',
        },
        fontFamily: {
            sans: ['Dosis', 'sans-serif'],
        },
        extend: {
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            boxShadow:{
                'bottomBar': '0px -1px 12px 4px #5c626938',
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-elevation')(['responsive']),
    ],
}
