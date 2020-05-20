const webpack = require('webpack');
const path = require('path');

module.exports = (env, options) => {
    const outputFileName = '[name].js';
    const publicPath = options.mode === 'development' ? 'http://localhost:3000/' : '';
    return {
        entry: {
            app: __dirname + '/extension/src/js/index.js',
        },
        output: {
            path: __dirname + '/extension/',
            publicPath: publicPath,
            filename: outputFileName,
        },
        devServer: {
            contentBase: path.join(__dirname, 'extension'),
            compress: true,
            port: 3000,
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ],
                        ],
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
    };
};
