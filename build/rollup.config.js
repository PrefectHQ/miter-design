// rollup.config.js
import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import scss from 'rollup-plugin-scss'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import minimist from 'minimist'

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie')

// Extract babel preset-env config, to combine with esbrowserslist
// const babelPresetEnvConfig = require('../babel.config')
// .presets.filter(
//   (entry) => entry[0] === '@babel/preset-env'
// )[0][1]

const debugTransformer = {
  transform(code, id) {
    console.log(id)
    // not returning anything, so doesn't affect bundle
  }
}

const argv = minimist(process.argv.slice(2))

const projectRoot = path.resolve(__dirname, '..')
const srcRoot = path.resolve(__dirname, '../src')

const baseConfig = {
  input: 'src/entry.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`
          }
        ]
      })
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    },
    vue: { preprocessStyles: true, css: true },
    //
    postVue: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
      }),
      debugTransformer,
      scss({
        extract: true,
        modules: {
          generateScopedName: '[local]___[hash:base64:5]'
        },
        sourceMap: true,
        include: '/src/styles/**/*.scss',
        importer: [
          function (url) {
            console.log(url)
            return {
              file: url.replace(/^@/, srcRoot)
            }
          }
        ]
      }),
      postcss({
        // same as true but path where to save
        // extract: join(distDir, 'main.css'),
        extract: true,
        minimize: true
      }),
      // debugTransformer,
      commonjs()
      // debugTransformer
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
}

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue'
]

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue'
}

// Customize configs for individual targets
const buildFormats = []
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: 'src/entry.esm.ts',
    external,
    output: {
      file: 'dist/miter-design.esm.js',
      format: 'esm',
      exports: 'named'
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              // We can add the config from babel.config.js later
              targets: esbrowserslist
            }
          ]
        ]
      })
    ]
  }
  buildFormats.push(esConfig)
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/miter-design.ssr.js',
      format: 'cjs',
      name: 'MiterDesign',
      exports: 'auto',
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel)
    ]
  }
  buildFormats.push(umdConfig)
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/miter-design.min.js',
      format: 'iife',
      name: 'MiterDesign',
      exports: 'auto',
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  }
  buildFormats.push(unpkgConfig)
}

// Export config
export default buildFormats
