const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

// webpack.common.js에 추가
module.exports = merge(common, {

  mode: 'development',
  // debug tool을 정해줍니다.
  devtool: 'inline-source-map',
  // dist의 빌드한 내용을 서버로 띄우겠다.

  devServer: {
    contentBase: './dist',
    port: 5000,
    // 빌드 대상 파일이 변경되면 자동으로 브라우저를 새로고침
    hot: true,
  },
});