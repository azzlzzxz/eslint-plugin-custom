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
