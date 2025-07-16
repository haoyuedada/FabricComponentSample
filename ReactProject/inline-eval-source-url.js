// babel-plugins/inline-eval-source-url.js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.get('callee');
        const args   = path.get('arguments');
        // 只处理形如 eval("…") 的调用
        if (
          callee.isIdentifier({ name: 'eval' }) &&
          args.length === 1 &&
          args[0].isStringLiteral()
        ) {
          // 获取当前文件名（Babel 会自动注入 state.filename）
          const filename = state.filename || '<unknown>';
          // 原始要 eval 的代码
          const original = args[0].node.value;
          // 用新的字符串 literal 替换旧的 argument
          args[0].replaceWith(
            t.stringLiteral(`/*# sourceURL=${filename} */\n${original}`)
          );
        }
      },
    },
  };
};
