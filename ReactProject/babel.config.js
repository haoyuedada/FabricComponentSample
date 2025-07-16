module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [
        // 放在最前面，确保所有 eval 都先被改写
        './inline-eval-source-url',
        // 如果你还在用 React Fast Refresh：
        'react-refresh/babel',
      ],
    },
    production: {
      plugins: [
        // 生产包无需插入 sourceURL
      ],
    },
  },
};
