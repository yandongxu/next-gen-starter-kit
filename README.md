# README

## quick start

```
$ npm start
```

## commands

- `npm run build` - build for production
- `npm run watch` - automatically recompile during development
- `npm start` - start a static development web server





## Using gulp-useref
https://css-tricks.com/gulp-for-beginners/


## TODO
- node-sass
- gulp-sourcemaps: for scss and es6
- gulp
- gulp-image-min
- gulp-uncss
- gulp-rev
- gulp-rev-replace
- stream: https://www.npmjs.com/package/gulp-rev/#streaming

## NEXT
- gulp-useref
- gulp-clean
- `tmp` folder
- handlebar template support(for generating html files)
  - html partials
- js file per page
  - webpack?
- browsersync?


const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const useref = require('gulp-useref');
const csso = require('gulp-csso');
const filter = require('gulp-filter');
const changed = require('gulp-changed');
