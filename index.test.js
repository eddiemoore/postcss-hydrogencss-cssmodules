const postcss = require('postcss');

const plugin = require('./');

function run(input, output, opts) {
  return postcss([ plugin(opts) ]).process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('transforms display flex', () => {
  return run(
    'a{ display: flex; }',
    'a{ composes: flex from \'postcss-hydrogencss-cssmodules/css/display-flex.css\'; }',
    {}
  );
});

it('transforms display block', () => {
  return run(
    'a{ display: block; }',
    'a{ composes: block from \'postcss-hydrogencss-cssmodules/css/display-block.css\'; }',
    {}
  );
});
