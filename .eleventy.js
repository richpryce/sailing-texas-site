const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  // Ignore template files (files starting with _)
  eleventyConfig.ignores.add("src/boats/_template.md");

  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  // Add collection for boats
  eleventyConfig.addCollection("boats", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/boats/*.md").sort((a, b) => {
      return (b.data.date || 0) - (a.data.date || 0);
    });
  });

  // Add collection for articles
  eleventyConfig.addCollection("articles", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/articles/*.md");
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Price formatting filter
  eleventyConfig.addFilter("formatPrice", function(price) {
    if (!price) return 'Contact for price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  });

  // Truncate text filter
  eleventyConfig.addFilter("truncate", function(text, length) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  });

  // Limit filter for arrays
  eleventyConfig.addFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  // Format number with locale (e.g., 20000 -> 20,000)
  eleventyConfig.addFilter("localeNumber", function(num) {
    if (!num) return '0';
    return new Intl.NumberFormat('en-US').format(num);
  });

  // Format number shorthand (e.g., 98462 -> 98.5K)
  eleventyConfig.addFilter("formatNumber", function(num) {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  });

  // Image shortcode for responsive images
  eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
    if (!src) return '';

    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Year shortcode for copyright
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
