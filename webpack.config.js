const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
const pluginsText = new Date().toUTCString() + '\n\r * built by `sunhongkui`';


const DIST = 'www';

var loaders = [
    {loader: 'css-loader'},
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: 'config/postcss.config.js'
            }
        }
    }
];
module.exports = {
    // 页面入口文件配置
    entry: {
        "main": ['whatwg-fetch','babel-polyfill','js/main.js'],
        "vendor": ["js/components/requireJQ.js","js/components/semantic.js","js/components/bootstrap/js/bootstrap-table.min.js","js/components/bootstrap/js/bootstrap-table-zh-CN.js","js/components/bootstrap/js/jquery.jedate.min.js"],
        "echart": ["js/components/bootstrap/js/echarts_3.js"]
    },
    // 入口文件输出配置
    output: {
        // publicPath: '',
        path: path.resolve(__dirname, DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/_[id].js?[hash]'
    },
    // 插件项
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["common"],
            chunks:['main','vendor','echart'],
            minChunks: 2
        }),
        new ExtractTextPlugin('css/[name].css'),
        new CopyWebpackPlugin([
            {from: 'images/tmp/**/*'},
            {from: 'json/',to:path.resolve(__dirname, DIST+"/json")}
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'images/favicon.ico',
            minify: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
            },
            inject: "body",
            hash: true,
            chunks: ['common','vendor','echart', 'main'],
            chunksSortMode: function(a, b) {
               var orders = ['common','vendor','echart', 'main'];
               return orders.indexOf(a.names[0]) - orders.indexOf(b.names[0]);
            }
        }),
        new webpack.ProvidePlugin({
            echarts: 'echarts',
            'window.echarts': 'echarts'
        })
        // ,new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // })
    ],
    module: {
        rules: [
            // jshint,代码优化时打开
            /*{
                test: /\.js$/,
                exclude:/(node_modules|lib)/,
                use: [
                    {
                        loader: "jshint-loader", 
                        options: { 
                            "freeze": true, // 禁止覆盖本地对象
                            "-W041": false,    // 忽略 === 与 == 的区别
                            // "loopfunc": true, // 允许循环中使用函数
                            "asi": true,    // 允许省略行尾分号
                            "esversion": 6, // 支持es6语法规则
                            "elision": true, // 支持[1,,,3]
                            "unused": true, // 警告未使用的定义对象
                            "expr": true,   // 可以使用表达式,某些[奇淫技巧]
                            "lastsemic": true // 最后的分号可以省略
                            // more see -> http://www.jshint.com/docs/options/
                        }
                    }
                ],
                enforce: 'pre'
            },*/
            {
                test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {test: /\.html$/,exclude:/node_modules/,use: [{loader: 'html-loader'}]},
            {
                test: /\.js$/,
                exclude:/(node_modules|libs|components)/,
                use: [
                    {
                        loader:'babel-loader',
                        options: {
                            presets: [["es2015", { "modules": false }]],
                            plugins: ["transform-object-rest-spread"]
                        }
                    }
                ]
            },
            {test: /\.tsx?$/,exclude:/(node_modules)/,use:['ts-loader']},
            {
                test: /\.css$/,
                exclude:/node_modules|libs|components/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders
                })
            },
            {
                test: /\.css$/,
                include:/libs|components/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{loader: 'css-loader'}]
                })
            },
            {
                test: /\.(scss|sass)$/,
                exclude:/node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders.concat({loader: 'sass-loader'})
                })
            },
            {
                test: /\.less$/,
                exclude:/node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: loaders.concat({loader: 'less-loader'})
                })
            },
            {
                test: /\.vue$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            extractCSS: true,
                            preserveWhitespace: false,
                            postcss: [ autoprefixer({browsers: ['last 9 versions']}) ],
                            loaders: {
                                 'ts': 'vue-ts-loader',
                                 'js': 'babel-loader?presets[]=es2015&plugins[]=transform-object-rest-spread'
                                /*'css': ExtractTextPlugin.extract({
                                    use: 'css-loader',
                                    fallback: 'vue-style-loader'
                                })*/
                            }
                        }
                    }
                ]
            },
            {test: /\.(json|data)$/,exclude:/node_modules/,use: ['json-loader']},
            {test: /\.(txt|md)$/,exclude:/node_modules/,use: ['raw-loader']},
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 8192,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?|eot|otf|svg)$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            limit: 1,
                            publicPath: "../",
                            name: 'fonts/[name].[ext]?[hash]'
                        }
                    }
                ]
            },
        ]
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.ts','.js','.vue'],
        alias: {
            "vue":              "js/libs/vue.common.js",
            "method":           "js/modules/method.js",
            "eventHub":         'js/modules/eventHub.js',
            "common-top":       'js/modules/common-top.vue',
            "public":            'js/modules/public.js'
        }
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false
    }),
    new webpack.BannerPlugin(pluginsText)
    /*new webpack.LoaderOptionsPlugin({
        minimize: true
    })*/
  ])
}