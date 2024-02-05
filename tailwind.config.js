/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "index.html",
        "./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
      extend: {
        flexBasis: {
            '1/7': '14.2857143%',
            '2/7': '28.5714286%',
            '3/7': '42.8571429%',
            '4/7': '57.1428571%',
            '5/7': '71.4285714%',
            '6/7': '85.7142857%',
        },
        gridTemplateColumns: {
            'layout': 'auto 1fr'
        },
        gridTemplateRows: {
            'layout': 'auto 1fr'
        },
        maxWidth: {
            '35': '35px',
            '47': '47px',
        },
        minWidth: {
            '47': '47px',
        }
      },
    },
    plugins: [],
}