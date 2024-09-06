module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      recommended: true,
      description: '强制在import中使用一致的./开头路径风格',
    },
    messages: {
      path: '请使用./开头的路径',
    },
    fixable: 'code',
    schema: [
      {
        enum: ['always', 'never'],
      },
    ],
  },

  create: function (context) {
    return {
      ImportDeclaration: (node) => {
        const {
          source: { value },
        } = node;
        if (typeof value !== 'string') return;

        if (!/^\.\.\//.test(value)) return;
        context.report({
          node: node.source,
          // 错误/警告提示信息
          messageId: 'path',
          fix(fixer) {
            return [
              fixer.replaceTextRange(
                [node.source.range[0] + 1, node.source.range[1] - 1],
                `./${value}`,
              ),
            ];
          },
        });
      },
    };
  },
};
