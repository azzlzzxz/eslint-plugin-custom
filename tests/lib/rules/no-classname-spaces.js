/*
 * @Author: xinxu
 * @Date: 2023-01-07 18:15:57
 * @LastEditors: xinxu
 * @LastEditTime: 2023-01-07 18:19:55
 * @FilePath: /eslint-plugin-custom/tests/lib/rules/no-classname-spaces.js
 */
"use strict";

let rule = require("../../../lib/rules/no-classname-spaces");
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

ruleTester.run("no-classname-spaces", rule, {
  valid: [`<div className="flex flex-wrap"></div>`],
  invalid: [
    {
      code: `<div className="  flex   items-center "></div>`,
      errors: [{ messageId: "space" }],
    },
  ],
});
