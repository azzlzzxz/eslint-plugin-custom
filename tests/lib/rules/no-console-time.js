/*
 * @Author: xinxu
 * @Date: 2023-01-07 16:33:20
 * @LastEditors: xinxu
 * @LastEditTime: 2023-01-07 17:20:02
 * @FilePath: /eslint-plugin-custom/tests/lib/rules/no-console-time.js
 */
"user strict";

let rule = require("../../../lib/rules/no-console-time");

let RuleTester = require("eslint").RuleTester;

let ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("no-console-time", rule, {
  valid: [
    // 合法示例
    "_.time({a:1});",
    "_.time('abc');",
    "_.time(['a', 'b', 'c']);",
    "lodash.time('abc');",
    "lodash.time({a:1});",
    "abc.time",
    "lodash.time(['a', 'b', 'c']);",
  ],

  invalid: [
    // 不合法示例
    {
      code: "console.time()",
      errors: [
        {
          messageId: "avoidMethod",
        },
      ],
    },
    {
      code: "console.time.call({}, 'hello')",
      errors: [
        {
          messageId: "avoidMethod",
        },
      ],
    },
    {
      code: "console.time.apply({}, ['hello'])",
      errors: [
        {
          messageId: "avoidMethod",
        },
      ],
    },
    {
      code: "console.time.call(new Int32Array([1, 2, 3, 4, 5]));",
      errors: 1,
    },
  ],
});
