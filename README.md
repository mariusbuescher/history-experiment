# Single Page Application with HTML5 History API

> A little experiment implementing a Single Page Application utilizing the HTML5 History API.

## What is it?

This is just a small experiment for me. I wanted to explore the capabilities of the HTML5 History API for a Single Page Application. The idea was that there is a document or anything else on the server for each page but it should do some of the rendering asynchronously on the client for better performance.

### Why did I do it?

Servers often take some time to deliver a homepage. They get the response, fetch data from a database or some other source and then render it. This is the fastest case. Often there is also a framework starting and running to perform all those tasks.

The data is then deliverd over a network connection which is often less then ideal and you can never predict how good these connections are. So developers try to get homepages as small as possible. But how to get it as small as possible? You could try to condense the markup as much as possible, but there is still a lot fo overhead when styling all this content.

The solution is that you just deliver pure data. So the server response may be also a little faster because rendering is more simple than rendering a whole page.

When delivering pure data, the browser does not have to load all that CSS and JavaScript every time the user clicks on a link. You can fetch these assets only once or on demand. Also you can only once fetch the templates which prevents some extra network traffic.

#### Problems with rendering on the client?

Often rendering on the client and rendering on the server requires different templates. Especialy when building a Single Page Application this often means you have to do the double amount of work when it comes to templating. There are templates for the backend you have to implement and there are the ones used in the frontend. So why not use one template for both? This is one Idea of this experiment: Use one templating language for generating static pages _and_ for asynchronously rendering content on the client.

In this case it is pretty easy because both frontend and page-generator use JavaScript as their underlying programming language. But when you think a little further, e.g. using a backend powered by php you have some kind of problem. This is why i chose [nunjucks](http://mozilla.github.io/nunjucks/) as my templating library. It is basicaly a port of the python-based templating language Jinja2. There are also ports of this templating language for other languages, e.g. [Twig](http://twig.sensiolabs.org/) for php. This makes it easier to implement a template or partials once and use then multiple times.

#### Loading modules and templates only once

For loading JavaScript modules only once I used [require.js](http://requirejs.org/). For loading templates I built a solution using Promises. Loading a template only once and then caching it gives some extra speed on slow connections.

## Browser support

The support for Web-Browsers was not a goal of this experiment, so there are not all Browser running htis project.

Because I used the HTML5 History API without a fallback the Internet Explorer is supported from Version 10 (See [caniuse](http://caniuse.com/#search=history)). If History API is not supported the default behaviour (load every page) is used.

## Requirements

There are only a few requirements for this project. These are:

- node.js and npm
- Apache web server (or nginx if you like, but configuration does not ship so you have to build your own from .htaccess file)

## Setup

The setup is pretty easy. Just type <code>npm install</code> and you are ready to go. Also you need to set up a virtual host with document root in <code>src/htdocs</code>.

## Developing

There is a watch-task ready in the <code>package.json</code>. You just have to type <code>npm run watch</code>.
