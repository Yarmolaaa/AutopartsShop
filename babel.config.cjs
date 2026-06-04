// Babel is used ONLY by Jest (Vite/esbuild handles the app build).
// `transform-vite-meta-env` rewrites Vite's `import.meta.env` to `process.env`
// so Jest (CommonJS) can parse files that read env vars.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: ['babel-plugin-transform-vite-meta-env'],
};
