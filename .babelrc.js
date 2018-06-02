const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const defaultBabelPresetEnvConfig = {
  // No module transformation, webpack will take care of this if necessary.
  'modules': false
};

// Latest browsers
const browserBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  'targets': {
    'browsers': [
      'last 2 versions',
      'not ie < 13',
      'not android < 50'
    ]
  }
});

// Legacy browsers
const legacyBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  'targets': {
    'browsers': [
      'last 5 versions',
      'not ie < 10'
    ]
  }
});

// Node
const nodeBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  'targets': {
    'node': '4.7'
  }
});

// Combined node and browser environment for es6 modules version and tests
const modulesBabelPresetEnvConfig = Object.assign({}, defaultBabelPresetEnvConfig, {
  'targets': Object.assign(legacyBabelPresetEnvConfig.targets, nodeBabelPresetEnvConfig.targets)
});

const plugins = [
  'transform-object-rest-spread',
  ['inline-replace-variables', {
    '__VERSION__': require('./package.json').version
  }]
];

let babelConfig = {
  plugins
};

if (env === 'browser') {
  babelConfig = Object.assign(babelConfig, {
    'presets': [
      ['env', browserBabelPresetEnvConfig],
      'flow'
    ]
  })
}

if (env === 'legacy') {
  babelConfig = Object.assign(babelConfig, {
    'presets': [
      ['env', legacyBabelPresetEnvConfig],
      'flow'
    ]
  })
}

if (env === 'modules') {
  babelConfig = Object.assign(babelConfig, {
    'presets': [
      ['env', modulesBabelPresetEnvConfig],
      'flow'
    ]
  })
}

if (env === 'node') {
  babelConfig = Object.assign(babelConfig, {
    'presets': [
      ['env', nodeBabelPresetEnvConfig],
      'flow'
    ]
  })
}

module.exports = babelConfig;
