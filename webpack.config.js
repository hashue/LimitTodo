const path = require('path');

module.exports ={
  entry:{
    bundle:'./public/js/index.ts'
  },
  output:{
    path: path.join(__dirname,'public/dist'),
    filename: 'index.js'
  },

  resolve:{
    extensions:['.ts','.js']
  },
  devServer:{
    contentBase: path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.ts$/,loader:'ts-loader'
      }
    ]
  }
}

