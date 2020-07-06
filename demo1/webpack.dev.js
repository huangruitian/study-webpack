const path = require("path");
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  // watch: true, //默认false，监听文件的变化并不能让浏览器更新。
  // watchOptions: {
  //    //不监听的文件夹，默认为空 
  //    ignored: /node_modules/,
  //    //默认值是300，也就是监听变化后300ms才去执行  
  //    aggregateTimeout:300,
  //    //默认值，每秒访问1000次，判断文件是否变化，是通过不停的询问指定的文件有没有变化。存放磁盘中；  
  //    poll:1000
  // },
  // 打包环境， production/development/none
  mode: "development",
  // 打包入口
  // entry:'./src/index.js',
  entry: {
    index: "./src/index.js",
  },
  output: {
    // 占位符，如果多个入口不用占位符会出错
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: "babel-loader",
      },
      { 
        test: /.less$/,
        // 特别注意，多个loader的加载使用是从右到左的。
        // 所以先style-loader, 再是css-loader 
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /.(png|jpg)$/,
        use: "file-loader",
      },
      {
        // 字体文件
        test: /.(woff|eot|woff2)$/,
        // use: "file-loader",
        use: [{
          loader:'url-loader',
          options: {
             limit: 10240, //小于10K自动base64
          }
        }]
      },
    ],
  },
  // loaders 无法完成的工作，plugins都可以完成。
  plugins:[
    new webpack.HotModuleReplacementPlugin(), //热更新
    new CleanWebpackPlugin(),//打包之前清楚文件
  ],
  // 要配合webpack自带的热更新插件
  devServer: {
    contentBase:'./dist', //服务的基础内容
    hot:true,             //开启热更新
  }
};
