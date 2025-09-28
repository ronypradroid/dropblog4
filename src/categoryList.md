---
layout: default
pagination:
  data: collections.categoryList
  size: 1
  alias: category
permalink: /categories/{{ category }}/
eleventyComputed:
  title: "{{ category }}"
---

<div class="max-w-2xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-2">Category: {{ category }}</h1>
  
  {% assign categoryPosts = collections.postsByCategory[category] %}
  <p class="text-gray-600 dark:text-gray-400 mb-8">
    {{ categoryPosts.size }} posts
  </p>
  
  {% for post in categoryPosts %}
    <div class="py-4 sm:py-10 border-b border-gray-200 dark:border-gray-700">
      <p>
        <span class="text-2xl sm:text-4xl font-bold hover:underline">
          <a href="{{ post.url }}">{{ post.data.title }}</a>
        </span>
      </p>
      <em>{{ post.date | date: "%Y-%m-%d" }}</em>
      
      {% if post.data.excerpt %}
        <p class="mt-4">{{ post.data.excerpt }}... 
          <span class="hover:underline text-indigo-500">
            <a href="{{ post.url }}">Read More</a>
          </span>
        </p>
      {% else %}
        <p class="mt-4">
          <span class="hover:underline text-indigo-500">
            <a href="{{ post.url }}">Read More</a>
          </span>
        </p>
      {% endif %}
      
      <!-- Tambahkan categories display -->
      {% if post.data.categories %}
        <div class="mt-3 flex flex-wrap gap-2">
          {% for cat in post.data.categories %}
            <a href="/categories/{{ cat }}/" 
               class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-2 py-1 rounded text-xs font-medium">
              {{ cat }}
            </a>
          {% endfor %}
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>