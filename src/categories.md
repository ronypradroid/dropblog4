---
layout: default
title: Categories
permalink: /categories/
---


  
  <div class="flex flex-wrap gap-3">
    {% for category in collections.categoryList %}
      {% assign categoryPosts = collections.postsByCategory[category] %}
      <a href="/categories/{{ category }}/" 
         class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-6 mb-4">
        {{ category }} ({{ categoryPosts.size }})
      </a>
    {% endfor %}
  </div>

