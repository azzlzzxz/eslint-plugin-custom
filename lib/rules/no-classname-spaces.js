/*
 * @Author: xinxu
 * @Date: 2023-01-07 17:33:02
 * @LastEditors: xinxu
 * @LastEditTime: 2023-01-07 18:22:09
 * @FilePath: /eslint-plugin-custom/lib/rules/no-classname-spaces.js
 */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "className 中有多余空格",
    },
    fixable: "code",
    messages: {
      space: "className 中有多余空格",
    },
    schema: [
      {
        enum: ["always", "never"],
      },
    ],
  },
  create: function (context) {
    return {
      JSXAttribute: (node) => {
        if (node.name.name !== "className") return;
        const classNameValueNode = node.value;
        if (/(^\s+|\s{2}|\s+$)/.test(classNameValueNode.value)) {
          context.report({
            node: classNameValueNode,
            messageId: "space",
          });
        }
      },
    };
  },
};
