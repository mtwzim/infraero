import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

const input = 'src/infraero.js';
const defaultPlugins = [
  babel({
    babelrc: false,
    runtimeHelpers: true,
    presets: [['@babel/preset-env', { modules: false }]],
    plugins: [['@babel/plugin-transform-runtime']],
  }),
];

export default [
  {
    input,
    plugins: [].concat(defaultPlugins, [commonjs()]),
    output: {
      file: 'dist/infraero.js',
      format: 'umd',
      name: 'cep',
    },
  },
];
