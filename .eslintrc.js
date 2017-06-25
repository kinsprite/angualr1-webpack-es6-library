/* eslint indent: ["error", 2] */

module.exports = {
  root: true,
  globals: {
    /**
     *  Define your globals here
     */
    expect: true,
    $: true,
    jQuery: true,
  },
  env: {
    browser: true,
    jasmine: true,
  },
  plugins: [
    'import',
    'promise',
    'compat',
    'json',
    'filenames',
  ],
  extends: [
    'eslint:recommended',
    // 'angular',
    'airbnb',
  ],
  rules: {
    /**
     *  angular
     */
    // 'angular/no-service-method': 'off',

    /**
     * eslint overwrite: recommended & airbnb
     */
    // all calls to require() to be at the top level of the module, similar to ES6 import and export statements
    'global-require': 'error',

    // line endings independent of operating system, VCS, or editor used across your codebase.
    'linebreak-style': ['error', 'unix'],

    // a consistent linebreak style for operators.
    'operator-linebreak': ['error', 'before'],

    // this option sets a specific tab width for your code
    indent: ['error', 4, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      MemberExpression: 1,
      FunctionDeclaration: {
        parameters: 1,
        body: 1
      },
      FunctionExpression: {
        parameters: 1,
        body: 1
      },
      CallExpression: {
        arguments: 1,
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
    }],

    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': ['error', { skipBlankLines: true }],

    // a maximum number of lines per file
    'max-lines': ['error', {
        max: 350,
        skipBlankLines: true,
        skipComments: true,
    }],
    // a maximum line length
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      comments: 120,
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    // a maximum number of statements allowed in function blocks
    'max-statements': ['error', { max: 50 }, { ignoreTopLevelFunctions: false }],
    // a maximum number of statements allowed per line
    'max-statements-per-line': ['error', { max: 1 }],

    // spacing inside braces of object literals, destructuring assignments, and import/export specifiers.
    'object-curly-spacing': ['error', 'always', {
      'arraysInObjects': false,
      'objectsInObjects': false,
    }],

    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': ['off', { // *** DISABLED ***
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],

    // enforce that class methods use "this"
    'class-methods-use-this': ['off', { // *** DISABLED ***
      exceptMethods: [],
    }],

    // require function expressions to have a name
    'func-names': ['off', 'always'], // *** DISABLED *** default is 'warn'

    // disallow un-paren'd mixes of different operators
    'no-mixed-operators': ['warn', {
      groups: [
        ['+', '-', '*', '/', '%', '**'],
        ['&', '|', '^', '~', '<<', '>>', '>>>'],
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true,
    }],

    // enforces no braces where they can be omitted
    'arrow-body-style': ['error', 'as-needed', {
      requireReturnForObjectLiteral: false,
    }],

    // require parens in arrow function arguments
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: true,
    }],

    // disallow declaration of variables that are not used in the code
    'no-unused-vars': ['warn', {
      vars: 'local',
      args: 'after-used',
      ignoreRestSiblings: true,
    }],

    // require let or const instead of var
    'no-var': 'warn',

    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': ['warn', {
      destructuring: 'any',
      ignoreReadBeforeAssign: true,
    }],

    // disallow use of the continue statement
    'no-continue': 'warn',

    // disallow use of unary operators, ++ and --
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    // require quotes around object literal property names
    'quote-props': ['warn', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

    // specify whether double or single quotes should be used
    quotes: ['warn', 'single', { avoidEscape: true }],

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: false, // *** ENABLE ***
    }],

    /**
     * JSDoc
     */
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',

    /**
     * import
     */
    'import/no-extraneous-dependencies': ['error', {
        'devDependencies': [
            '**/*.spec.js',
            'gulpfile.js',
            'gulp_tasks/*.js',
            'conf/*.conf.js',
            'conf/*.plugin.js',
        ]}],

    /**
     * compat
     */
    'compat/compat': 'error',

    /**
     * filenames
     */
    'filenames/match-regex': ['error', /^[a-z][a-z0-9\-\.]*$/g, true],
    'filenames/match-exported': 'off',
    'filenames/no-index': 'off',
  },
};
