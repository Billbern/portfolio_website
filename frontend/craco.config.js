// Inject the Tailwind CSS PostCSS plugin into CRA 4's hardcoded PostCSS pipeline.
// react-scripts@4 doesn't read postcss.config.js, so we splice it in here.
module.exports = {
    style: {
        postcss: {
            plugins: [require('tailwindcss'), require('autoprefixer')],
        },
    },
};
