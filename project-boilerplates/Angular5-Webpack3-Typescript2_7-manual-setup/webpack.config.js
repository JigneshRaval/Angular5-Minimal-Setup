const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let ENV = process.env.NODE_ENV;

let baseWebpackConfig = {
    entry: {
        'app': './src/main.ts',
        'vendor': './src/vendor.ts',          // Libs or Vendor files like jQuery, Lodash, Bootstrap etc. including Angular and RxJS
        'polyfills': './src/polyfills.ts'   // Polyfills like Core.js, Zone.js
    },
    watch: true,
    output: {
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        filename: '[name].js', // string
        //filename: "[name].js", // for multiple entry points
        //filename: "[chunkhash].js", // for long term caching
        // the filename template for entry chunks

        publicPath: "/", // string
        //publicPath: "",
        //publicPath: "https://cdn.example.com/",
        // the url to the output directory resolved relative to the HTML page

        libraryTarget: "umd", // universal module definition
        /*
		libraryTarget: "umd2", // universal module definition
        libraryTarget: "commonjs2", // exported with module.exports
        libraryTarget: "commonjs-module", // exports with module.exports
        libraryTarget: "commonjs", // exported as properties to exports
        libraryTarget: "amd", // defined with AMD defined method
        libraryTarget: "this", // property set on this
        libraryTarget: "var", // variable defined in root scope
        libraryTarget: "assign", // blind assignment
        libraryTarget: "window", // property set to window object
        libraryTarget: "global", // property set to global object
        libraryTarget: "jsonp", // jsonp wrapper
		*/
        // the type of the exported library
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.css'],
        // This will resolve module path when using "npm link"
        alias: { "@angular": path.join(__dirname, "node_modules/@angular") }
        //modules: ['src', 'node_modules']
        // OR this (surprisingly both worked for me):
        //alias: { "my-package": path.join(__dirname, "../my-package" },

        // You don't really need the resolve.fallback unless you do: import "something"
        // that is not in my-package's package.json dependencies.
        //fallback: path.join(__dirname, "node_modules")
    },
    resolveLoader: {
        modules: ["node_modules"] // This will resolve module path when using "npm link"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    // watch: true,
    // cache: true,
    // adding plugins to your configuration
    plugins: [
        /* new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        */
        // compile time plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        /* new UglifyJSPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
            uglifyOptions: {
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false
                },
                toplevel: false,
                nameCache: null,
                ie8: false,
                safari10: false,
            }
        }), */
        //new webpack.HotModuleReplacementPlugin(),
        /* new webpack.ProvidePlugin({
            '$': './src/assets/js/jquery.js',
            jQuery: './src/assets/js/jquery.js'
        }) */
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: /(node_modules|bower_components)/
            },
            /*
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /(node_modules|bower_components)/
            } */
        ]
    }
}

module.exports = baseWebpackConfig;
