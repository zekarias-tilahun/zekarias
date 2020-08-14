---
layout: pages
title: Recent Posts (የሰሞኑን ልጥፎች)
---

{% for post in site.posts %}

<!-- <div class="card bg-light mb-3" style="max-width: 18rem;">
        <div class="card-header"><a href="{{ post.url }}">{{ post.title }}</a></div>
        <div class="card-body">
            <h5 class="card-title">Light card title</h5>
            <p class="card-text">{{ post.excerpt }}</p>
        </div>
    </div> -->
<div class="card mb-3">
    <!-- <img src="..." class="card-img-top" alt="..."> -->
    <div class="card-body">
        <h5 class="card-title">
            <a href="{{ post.url }}">{{ post.title }}</a>
        </h5>
        <p class="card-text">{{ post.excerpt }}</p>
        <p class="card-text">
            <small class="text-muted"
                >Last updated {{ post.date | date_to_string }}</small
            >
        </p>
    </div>
</div>
{% endfor %}
