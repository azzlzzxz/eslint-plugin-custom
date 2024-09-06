const rule = require('../../../lib/rules/import-path-style');
const RuleTester = require('eslint').RuleTester;
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};
const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('import-path-style', rule, {
  valid: [`import { chart } from './../../utils/initCharts';`],
  invalid: [
    {
      code: `import { chart } from '../../utils/initCharts';`,
      output: `import { chart } from './../../utils/initCharts';`,
      errors: [
        {
          messageId: 'path',
        },
      ],
    },
  ],
});
