const pkg = require("./package.json");

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? `/fe/${pkg.name}` : "",
    outputDir: `../../dist/${pkg.name}`,
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': []
            },
            postcss: {
                autoprefixer: {},
                plugins: [
                    require('postcss-px2rem')({
                        remUnit: '37.5',
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/coupon_api': {
                target: 'http://m.test109.iguanyu.com/coupon_api',
                changeOrigin: true,
                pathRewrite: {
                    '^/coupon_api': '/'
                }
            },
        }
    },
};