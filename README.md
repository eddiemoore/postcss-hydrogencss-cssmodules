# PostCSS Hydrogencss Cssmodules [![Build Status][ci-img]][ci]

[PostCSS] plugin to transform declarations into css modules composes using hydrogencss.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/eddiemoore/postcss-hydrogencss-cssmodules.svg
[ci]:      https://travis-ci.org/eddiemoore/postcss-hydrogencss-cssmodules

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-hydrogencss-cssmodules') ])
```

See [PostCSS] docs for examples for your environment.
