const rule = require('../../../lib/rules/no-classname-spaces');
const RuleTester = require('eslint').RuleTester;
const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};

const code =
  `function Page() {
return  <div className="      222
33   dd     ">23232
<div className={` +
  '`' +
  '6666   ${' +
  `
                    true ? ' absolute top-0 inset-x-0' : ''
  ` +
  '}        777  ' +
  '`' +
  '}> <div className={` rounded-6 mr-10 flex-shrink-0  h-[80px] w-[80px] `}>ccc</div></div></div>}';

const ruleTester = new RuleTester({
  parserOptions,
  // eslint-disable-next-line node/no-unpublished-require, node/no-missing-require
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-classname-spaces', rule, {
  valid: [`<div className="detail dd 66"> 23232</div>`],
  invalid: [
    {
      code,
      output:
        `function Page() {
return  <div className="222
33 dd">23232
<div className={` +
        '`' +
        '6666 ${' +
        `
                    true ? ' absolute top-0 inset-x-0' : ''
` +
        '  } 777' +
        '`' +
        '}> <div className={`rounded-6 mr-10 flex-shrink-0 h-[80px] w-[80px]`}>ccc</div></div></div>}',
      errors: [
        {
          messageId: 'space',
        },
        {
          messageId: 'space',
        },
        {
          messageId: 'space',
        },
      ],
    },
    {
      code: `const a = ()=><div className="   flex h-[200px] w-[200px]
            
            
      items-center justify-center bg-gray-f8f8f8      ">123</div>;`,

      output: `const a = ()=><div className="flex h-[200px] w-[200px] items-center justify-center bg-gray-f8f8f8">123</div>;`,
      errors: [
        {
          messageId: 'space',
        },
      ],
    },
    {
      code: `const a = ()=><div className="  flex h-[200px] w-[200px] items-center justify-center bg-gray-f8f8f8      ">123</div>;`,

      output: `const a = ()=><div className="flex h-[200px] w-[200px] items-center justify-center bg-gray-f8f8f8">123</div>;`,
      errors: [
        {
          messageId: 'space',
        },
      ],
    },
  ],
});
