const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin")
const aoptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  // 打包环境， production/development/none
  mode: "production", //默认开启js压缩
  // 打包入口
  // entry:'./src/index.js',
  entry: {
    index: "./src/index.js",
  },
  output: {
    // 占位符，如果多个入口不用占位符会出错
    filename: "[name]_[chunkhash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      {
        test: /.css$/,
        use: [miniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.less$/,
        // 特别注意，多个loader的加载使用是从右到左的。
        // 所以先style-loader, 再是css-loader
        use: [miniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /.(png|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name:'[name]_[hash:8].[ext]'
            },
          },
        ],
      },
      {
        // 字体文件
        test: /.(woff|eot|woff2)$/,
        // use: "file-loader",
        use: [
            {
              loader: "file-loader",
              options: {
                name:'[name]_[hash:8].[ext]'
              },
            },
          ],
      },
    ],
  },
  plugins:[
      // 和style-loader互斥，   
      new miniCssExtractPlugin({
          filename:'[name]_[contenthash:8].css'
      }),
      // 压缩css，注意要使用css处理器 cssnano 
      new aoptimizeCssAssetsWebpackPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require("cssnano")
      }),
      //使用html模板   
      new htmlWebpackPlugin({
          template: path.resolve(__dirname, 'src/index.html'),
          filename:'index.html',
          chunks:['index'],
          inject: true,
          minify: {
              html5: true,
              collapseWhitespace: true,
              preserveLineBreaks:false,
              minifyCSS:true,
              minifyJS:true,
              removeComments:false
          }
      }),
      // 打包之前清楚dist目录   
      new CleanWebpackPlugin(),
  ]
};
