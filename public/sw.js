if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/XqCeZXewR1C_LK6RAnm1M/_buildManifest.js",revision:"f0b621d425065f9244eb8520768c56a7"},{url:"/_next/static/XqCeZXewR1C_LK6RAnm1M/_ssgManifest.js",revision:"5352cb582146311d1540f6075d1f265e"},{url:"/_next/static/chunks/0c428ae2-03034d7434228b8d.js",revision:"03034d7434228b8d"},{url:"/_next/static/chunks/133-5df0d387793452a0.js",revision:"5df0d387793452a0"},{url:"/_next/static/chunks/1a48c3c1-10e9eab92c08d0ea.js",revision:"10e9eab92c08d0ea"},{url:"/_next/static/chunks/1bfc9850-4ac8428fd6c4eb5a.js",revision:"4ac8428fd6c4eb5a"},{url:"/_next/static/chunks/252f366e-d9094eb717b985f2.js",revision:"d9094eb717b985f2"},{url:"/_next/static/chunks/54-8221a4e399975c04.js",revision:"8221a4e399975c04"},{url:"/_next/static/chunks/545f34e4-9f4885a7a2e89afb.js",revision:"9f4885a7a2e89afb"},{url:"/_next/static/chunks/7-aabc81e47e0897cd.js",revision:"aabc81e47e0897cd"},{url:"/_next/static/chunks/7f0c75c1-9e0d24ea04f100fc.js",revision:"9e0d24ea04f100fc"},{url:"/_next/static/chunks/960-75fbd26f46fed27a.js",revision:"75fbd26f46fed27a"},{url:"/_next/static/chunks/978-79f3d118f61984ca.js",revision:"79f3d118f61984ca"},{url:"/_next/static/chunks/d0c16330-75fa1ed10aac4662.js",revision:"75fa1ed10aac4662"},{url:"/_next/static/chunks/d64684d8-e2c8d034494a04c6.js",revision:"e2c8d034494a04c6"},{url:"/_next/static/chunks/framework-9b5d6ec4444c80fa.js",revision:"9b5d6ec4444c80fa"},{url:"/_next/static/chunks/main-b2616eea889b0f38.js",revision:"b2616eea889b0f38"},{url:"/_next/static/chunks/pages/_app-b7f0772d274718e4.js",revision:"b7f0772d274718e4"},{url:"/_next/static/chunks/pages/_error-7397496ca01950b1.js",revision:"7397496ca01950b1"},{url:"/_next/static/chunks/pages/calculator-6195e7f605ef62de.js",revision:"6195e7f605ef62de"},{url:"/_next/static/chunks/pages/comparator-9f1b5eb7b10f6117.js",revision:"9f1b5eb7b10f6117"},{url:"/_next/static/chunks/pages/equivalence-a42079041016ab39.js",revision:"a42079041016ab39"},{url:"/_next/static/chunks/pages/index-759db3135884a676.js",revision:"759db3135884a676"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b5970c8fd8aa7fdb.js",revision:"b5970c8fd8aa7fdb"},{url:"/_next/static/css/d693564159d29708.css",revision:"d693564159d29708"},{url:"/android-chrome-192x192.png",revision:"55518f5804c5101c69b000820bf6d53a"},{url:"/android-chrome-512x512.png",revision:"068ec01031ded1b885366dd07a659aa2"},{url:"/apple-touch-icon.png",revision:"bdfbb57bfabd0de720dcec4620b9ef74"},{url:"/browserconfig.xml",revision:"61bfd064535af0c276bb63b3fd579733"},{url:"/favicon-16x16.png",revision:"4b2c49d2b975d66df20f93efbda45010"},{url:"/favicon-32x32.png",revision:"4cf0f061a9857465df0baafdb533b4db"},{url:"/favicon.ico",revision:"356a9f23d88d3782445d0a4ac9752c16"},{url:"/images/foodNotFound.png",revision:"1464b9d6ca7fdabc48e0440728adb620"},{url:"/logo.svg",revision:"92c6cdad9c2bd06f42dfc4eed4a9388f"},{url:"/manifest.json",revision:"654a101492df880dc4def6b48475f7ef"},{url:"/mstile-144x144.png",revision:"b7f096bc038edda43e3ca4ec9a6243cb"},{url:"/mstile-150x150.png",revision:"2c885dba0d6915744ea9219ba734dd68"},{url:"/mstile-310x150.png",revision:"d600713b3a38254e82cfafee6b47101c"},{url:"/mstile-310x310.png",revision:"1fd1b73b6ab5ebde843a73523463f6b1"},{url:"/mstile-70x70.png",revision:"23c6665c23565af2c990038470437e69"},{url:"/safari-pinned-tab.svg",revision:"3992810ecbe3db908d4b211d686f1f08"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));