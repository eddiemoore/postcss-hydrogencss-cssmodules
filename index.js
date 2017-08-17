const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

const createDirectory = name => {
  if (!fs.existsSync(name)) {
    fs.mkdirSync(name);
  }
};

module.exports = postcss.plugin(
  'postcss-hydrogencss-cssmodules',
  () => (root) => {
    createDirectory(path.join(__dirname, 'css'));

    root.walkDecls(decl => {
      const { prop, value, parent } = decl;
      if (
        decl.prop !== 'composes' &&
        decl.prop !== 'animation-name' &&
        !value.includes('(') &&
        /^\.[\w]+$/.test(parent.selector)
      ) {
        const className = `${prop}-${value}`
          .replace(/\./g, '-')
          .replace(/ /g, '-')
          .replace(/#/g, '')
          .replace(/%/g, 'percent');
        const cssPath = path.join(__dirname, 'css', `${className}.css`);
        try {
          if (!fs.existsSync(cssPath)) {
            fs.writeFileSync(cssPath, `.${className} { ${prop}: ${value}; }`);
          }
        } catch (err) {
          console.error(err);
        }
        decl.prop = 'composes'; // eslint-disable-line no-param-reassign
        // eslint-disable-next-line max-len
        decl.value = `${className} from 'postcss-hydrogencss-cssmodules/css/${className}.css'`;
      }
    });
  });
