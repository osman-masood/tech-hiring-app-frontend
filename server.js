import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import config from './config';

const APP_PORT = Number(process.env.PORT || 3001);

const env = {
    production: process.env.NODE_ENV === 'production'
};


// Serve the Relay app
const compiler = webpack({
    entry: path.resolve(__dirname, 'src', 'main.js'),
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/,
            }
        ]
    },
    output: {filename: 'app.js', path: '/'}
});


if (env.production === false) {
    const app = new WebpackDevServer(compiler, {
        contentBase: '/public/',
        publicPath: '/src/',
        proxy: { '/graphql': config.scapholdUrl },
        stats: {colors: true},
        inline: true,
        hot: true,
        historyApiFallback: true
    });
    // Serve static resources
    app.use(express.static(path.resolve(__dirname, 'public')));

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    // app.get('*', function (request, response) {
    //     response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
    // });

    app.listen(APP_PORT, (err) => {
        if (err) {
            console.error("Webpack dev server: Error", err);
        }
        console.log(`App is now running on http://localhost:${APP_PORT}`);
    });
}

/**
 https://github.com/kriasoft/react-static-boilerplate/blob/master/package.json
 */

