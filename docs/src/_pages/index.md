---
layout: full
title: Lookbook
lookbook_embeds: true
---

<div class="pb-40">
  <header class="layout-slat text-center mt-14 mb-16">
    <div class="layout-slat-grid">
      <div class="col-span-8 col-start-3">
        <h1 class="text-2xl sm:text-4xl font-extralight !leading-[1.4] max-w-[700px] mx-auto"> 
          Lookbook is a <span class="text-indigo-700">UI component development environment</span> for Ruby on Rails applications.
        </h1> 
        <div class="max-w-[580px] mx-auto mt-6">
          <p class="text-base sm:text-lg">
            It combines a powerful <strong class="font-semibold">component preview system</strong> with an integrated 
            <strong class="font-semibold">documentation engine</strong> to help teams build robust, modular, maintainable user interfaces.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-10 space-x-4 text-gray-400">
          <a href="<%= links.v2.demo %>" class="underline text-indigo-500 whitespace-nowrap hidden sm:block" target="_blank">View the demo</a>
          <em class="hidden sm:block">or</em>
          <%= button "Get Started", guide_url(:installation), icon: :chevrons_right %>
        </div>
      </div>
    </div>
  </header>
  
  <section class="relative overflow-hidden">
    <div class="layout-slat relative h-[49vw] mx:h-[675px] -mb-24">
      <div class="layout-slat-grid absolute bottom-4 left-0 right-0 z-10">
        <div class="col-span-4">
          <%= screenshot "preview_class.png" %>
        </div>
      </div>
      <div class="layout-slat-grid absolute bottom-0 left-0 right-0 z-20">
        <div class="col-span-8 col-start-3">
          <%= screenshot "params_editor.svg" %>
        </div>
      </div>
      <div class="layout-slat-grid absolute left-0 right-0 bottom-10 z-30">
        <div class="col-span-3 col-end-13">
          <%= screenshot "inspector_mobile.png" %>
        </div>
      </div>
    </div>
    <div class="h-[40px] bg-white z-50 absolute bottom-0 left-0 right-0 w-full" style="box-shadow: -5px 0 20px rgba(0,0,0,0.2)"></div>
  </section>

  <% if false %>
  
  <section class="feature-slat z-[100]">
    <div class="feature-slat-inner">
      <div>
        <div class="sticky top-12 pt-8 max-w-[460px]">
          <h2 class="feature-slat-title">
            Preview Embeds
            <span class="feature-slat-badge">new!</span>
          </h2>
          <div class="prose">
            <p>The new <strong>preview embeds</strong> feature lets you embed component previews outside of Lookbook with just a few lines of code.</p>
            <p>Embedded previews have plenty of <a href="<%= guide_url :previews_embeds %>#config">configuration options</a> and are fully responsive. Have a play with the example on the right and see what you think!</p>
          </div>
        </div>
      </div>
      <div>
        <lookbook-embed
          preview="Feedback::BlankSlateComponentPreview"
          scenario="default"
          panels="params,source,output"
          class="shadow-xl rounded-md"
          style="border: 1px solid red;"
          actions="false"
          param-title="hello"
          param-icon="true">
        </lookbook-embed>
      </div>
    </div>
  </section>

  <% end %>
</div>