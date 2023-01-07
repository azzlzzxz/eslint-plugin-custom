/*
 * @Author: xinxu
 * @Date: 2023-01-07 14:38:09
 * @LastEditors: xinxu
 * @LastEditTime: 2023-01-07 18:15:26
 * @FilePath: /eslint-plugin-custom/lib/rules/no-console-time.js
 */
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      recommended: true,
      description: "no console.time()",
    },
    fixable: "code",
    messages: {
      avoidMethod: "console method {{name}} is forbidden.",
    },
    schema: [
      {
        enum: ["always", "never"],
      },
    ],
  },

  create: function (context) {
    return {
      MemberExpression: (node) => {
        if (node.object.name === "console" && node.property.name === "time") {
          context.report({
            node,
            messageId: "avoidMethod",
            data: {
              name: "time",
            },
          });
        }
      },
    };
  },
};
