const path = require('path');
const svgContents = require("eleventy-plugin-svg-contents");
const pluginSrcsetImg = require( "eleventy-plugin-srcset" );
var dateFilter = require('nunjucks-date-filter');

module.exports = function(eleventyConfig) {

  // Plugins
  eleventyConfig.addPlugin( pluginSrcsetImg );
  eleventyConfig.addPlugin(svgContents);

  const md = require('markdown-it')({
      html: false,
      breaks: true,
      linkify: true
  });

  eleventyConfig.addNunjucksFilter("markdownify", markdownString => md.render(markdownString));

  // Copy files
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('./src/assets');
  // eleventyConfig.addPassthroughCopy('./src/uploads');
  eleventyConfig.addPassthroughCopy({ "./src/_favicons/**/*": "./" });

  // Collections
  eleventyConfig.addCollection('events', collection => {
    return collection.getFilteredByGlob('./src/events/*.md');
  });

  eleventyConfig.addCollection('activities', collection => {
    return collection.getFilteredByGlob('./src/activities/*.md');
  });

  eleventyConfig.addCollection('casestudies', collection => {
    return collection.getFilteredByGlob('./src/casestudies/*.md');
  });


  eleventyConfig.addNunjucksFilter("date", dateFilter);

  eleventyConfig.addFilter('where', function (array, key, value) {

    return array.filter(item => {

      return (item.data[key] === value ? item : false);
    });
  });

  eleventyConfig.addFilter('whereNested', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
    });

  });

  eleventyConfig.addFilter('whereContains', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey.indexOf(value) == -1 ? false : item);
    });
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: [
      '_includes',
      '.'
    ]
  });

  return {
    dir: {
      input: "./src",      // Equivalent to Jekyll's source property
      output: "./dist", // Equivalent to Jekyll's destination property
      data: `./_data/`,
      includes: `./_includes/`,
    },
    // passthroughFileCopy: true,
    templateFormats: [
      "njk",
      "md",
      "html"
    ]
  };
};
