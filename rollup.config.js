import resolve from '@rollup/plugin-node-resolve';
import  terser  from '@rollup/plugin-terser';
import html from 'rollup-plugin-html';

export default {
  input: 'staticNewUI/script.js',
  output: {
    file: 'public/bundler/bundler/bundle.js',
    format: 'es',
  },
  plugins: [
    resolve(),  // Resolve node modules
    terser(),   // Minify JavaScript
    html({
      template: 'index.html',   // Use index.html as the template
      target: 'staticNewUI/index.html', // Output as a single HTML file
      inject: 'body'             // Inject the bundled script into <head>
    }),
  ]
};