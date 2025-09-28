const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight)
  
  // To enable merging of tags
  eleventyConfig.setDataDeepMerge(true)

  // Copy these static files to _site folder
  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/manifest.json')

  // To create excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: 'post_excerpt',
    excerpt_separator: '<!-- excerpt -->'
  })

  // To create a filter to determine duration of post
  eleventyConfig.addFilter('readTime', (value) => {
    const content = value
    const textOnly = content.replace(/(<([^>]+)>)/gi, '')
    const readingSpeedPerMin = 450
    return Math.max(1, Math.floor(textOnly.length / readingSpeedPerMin))
  })

  // Enable us to iterate over all the tags, excluding posts and all
  eleventyConfig.addCollection('tagList', collection => {
    const tagsSet = new Set()
    collection.getAll().forEach(item => {
      if (!item.data.tags) return
      item.data.tags
        .filter(tag => !['posts', 'all'].includes(tag))
        .forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  })

  const md = markdownIt({ html: true, linkify: true })
  md.use(markdownItAnchor, { 
    level: [1, 2], 
    permalink: markdownItAnchor.permalink.headerLink({ 
      safariReaderFix: true,
      class: 'header-anchor',
    })
  })
  eleventyConfig.setLibrary('md', md)

  // asset_img shortcode
  eleventyConfig.addLiquidShortcode('asset_img', (filename, alt) => {
    return `<img class="my-4" src="/assets/img/posts/${filename}" alt="${alt}" />`
  })

// Categories collection - simplified
eleventyConfig.addCollection("categoryList", function(collection) {
  let categories = new Set();
  
  // Get all posts
  const posts = collection.getFilteredByTag("posts");
  
  posts.forEach(post => {
    if (post.data.categories) {
      let postCategories = post.data.categories;
      
      // Handle both string and array
      if (typeof postCategories === 'string') {
        postCategories = [postCategories];
      }
      
      if (Array.isArray(postCategories)) {
        postCategories.forEach(cat => {
          if (cat && typeof cat === 'string') {
            categories.add(cat);
          }
        });
      }
    }
  });
  
  return Array.from(categories).sort();
});

// Posts by category
eleventyConfig.addCollection("postsByCategory", function(collection) {
  const categoryMap = {};
  const posts = collection.getFilteredByTag("posts");
  
  posts.forEach(post => {
    if (post.data.categories && !post.data.draft) {
      let postCategories = post.data.categories;
      
      if (typeof postCategories === 'string') {
        postCategories = [postCategories];
      }
      
      if (Array.isArray(postCategories)) {
        postCategories.forEach(category => {
          if (category && typeof category === 'string') {
            if (!categoryMap[category]) {
              categoryMap[category] = [];
            }
            categoryMap[category].push(post);
          }
        });
      }
    }
  });
  
  return categoryMap;
});


  return {
    dir: {
      input: 'src'
    }
  }
}
