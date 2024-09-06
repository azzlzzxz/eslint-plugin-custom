module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'className 空格有很多',
    },
    fixable: 'code',
    messages: {
      space: 'className 中间有多余的空格',
    },
    schema: [
      {
        enum: ['always', 'never'],
      },
    ],
  },

  create: function (context) {
    return {
      // 文本
      JSXAttribute: (node) => {
        if (node.name.name !== 'className') return;
        const classNameValueNode = node.value;
        const text = context.getSourceCode(classNameValueNode).text;
        let textValue = classNameValueNode?.value;
        let [start, end] = classNameValueNode.range;
        if (node.value.type === 'JSXExpressionContainer') {
          start += 2;
          end -= 2;

          textValue = text.slice(start, end);

          start -= 1;
          end += 1;
        }
        // eslint-disable-next-line no-useless-escape
        const reg = /((?<=\S)([ ]{2,})(?=\S))|((?<=[\w\]\}])(\s{2,})(?=\w))/g;

        if (reg.test(textValue) || /^ +| +$/.test(textValue)) {
          
          const newText = textValue.trim().replace(reg, ' ');

          context.report({
            node: classNameValueNode,
            // 错误/警告提示信息
            messageId: 'space',
            // 修复
            fix(fixer) {
              return [fixer.replaceTextRange([start + 1, end - 1], newText)];
            },
          });
        }
      },
    };
  },
};
