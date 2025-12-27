module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      'react-native-reanimated/plugin',['@babel/plugin-proposal-decorators', { legacy: true }],['@babel/plugin-proposal-class-properties', { loose: true }], 
    ]
};