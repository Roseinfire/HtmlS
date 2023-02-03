![](https://raw.githubusercontent.com/Roseinfire/HtmlS/main/images/Darkbean(300x300).png)
# Introduction
Hyper Text Markup used everywhere on the web. <br>
Written more than thirty years ago, it is not so human friendly. <br>
HtmlS is the decoration language above html, which <br>
written to be `more` `flexible` and more `comfortable`

## Advantages

* Human friendly syntax
* Easy to set up a preload
* Easy to create elements group
* Easy to choose a content layout
* Add class even easier than in html
* Nothing easier than create child node
* Automatically sets `<br>` before new string
  
# Installation
Connect the script and let it do all the dirty jobs for you. <br>
HtmlS compilates inside any `<script>` specified as `text/htmls` <br>
It's also possible to store htmls separately from html.
```HTML
 <script src="https://roseinfire.github.io/HtmlS/begin.js"></script>
```
# Syntax
### Comments
```javascript
~ comment ~
```
* Comments should not be a part of another syntax.
* Comments also appear in the console.

### Elements
```javascript
# Hello World! *tag
```
* after `#` goes innerHTML, takes any value exclude `*`
* `tag` takes classic tag name like `p` or `div`

### Classes
```javascript
# Element with className *div .class
```
* Add `.name` and element will have class attribute set to name
* exclude spaces from your class name

### Attributes
```javascript
 # *img { src="example.png", id="image" }
```
* Between brackets `{` and `}` specify attributes. Separate with `,`
* Remember that they are properties, not html attributes

### Nodes
```javascript
# *div .header
 -  # *div .firstChild
  --  # *div .secondChild
```
* To specify child node, begin command from `-`
* The element appends to first node witch have one minus less
* Any number of spaces can be used between minuses


### Groups
```javascript
  # *div .square [margin proportion quantity] .container
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments with spaces.
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in group (`1` by default)
* first class related to a single element
* second class related to container

### External files
To connect an external file, init source with `import` keyword. <br>
File action defined automatically by its extension.
```javascript
 import "root/code.js"
 import "root/style.css"
```
* `js` files become scripts <br>
* `css` files become styles <br>

## Setup
> Macro parameters setting via attributes
```HTML
<head layout="fullscreen">
  <script type="htmlscript" fetch="root/site.json"></script>
</head>
```
### `layout`
General plan of your site. Related to `<head>`<br>
Currently support three layouts:
* static `number`<br>
number shows width of content in pixels.
* relative `number` <br>
number shows screen percentage occupied by content.
* fullscreen <br>
Have not any arguments.
### `theme` 
Indicates color of `Loading..` string<br>
Related to `<head>`. By default set to `rgba(217, 210, 210, 0.6)`
### `image`
Attribute takes a url and indicates the background-image of your page. <br>
background-image also comes from style, but `image` is visible only after load. <br>
Related to `<body>`. By default not set.
### `style`
Style of the `<body>` element is the same as in the source html.
### `fetch`
Specific attribute related to `<script type="htmls">`. <br>
Fetch contains a link to code, if you would like to store it separately.<br>
By default not set.

### Congratulations! 
You finished a short study. <br>
Give the project a star, if you like to support the project. <br>
Your support is really important!

# Development
The best way to take part in this project - leave a comment.<br>
Just go to the discussions and write about what features you would like to see in htmls. <br>
Also you can invent and write a layout to help easily create beautiful sites. <br>
There are no such things that never need to be better. Every function described in the Iterations.js file <br>
We are also working on Wiki and other documentation. <br>
You can take any part of the project, read about and make it better <br>
And of course, if you are an optimization specialist, welcome.

# Learn more
### About safety
You build a site with htmls, not htmls build a site for you. This is our rule. <br>
If your site is built from a local file, it stays local. `No data shared` from local files.<br>
If your site is hosted on a public server, then it is public. <br>
Keep in mind that HtmlS will not take responsibility, <br>
if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. That's why the HtmlS `open code` project.
  
### About advertisement
HtmlS itself `never use advertisement`. <br>
Everyone can use advertisements on his own site when it is built with htmls. <br>
We believe that best support is to join the project or just give it a star. <br>
However, you can support HtmlS on Ko-fi. <br>

### About installation
If your site is built with a cross-site script, it will not work when the script isn't accessible. <br>
So, the better idea is to download htmls to your project's folder. <br>
To run script from a folder, you need a special attribute `host` set to HtmlS path including the domain. <br>
Host also will work if you load the script directly from github, not from github pages. <br>
Note that you also need to set localhost to test your site locally.
```HTML
<html host="https://website.com/path">
  <head>
     <script src="path/begin.js"></script>
  </head>
</html>
```
### About performance
We use coss-site `fetch` constructions, which slows down the load speed. <br>
In most browsers, the effect will disappear after the first load.  <br>
However, for more beautiful loading we recommend creating a `loading..` element on the source page.

### About syntax
During development, we tried a lot of syntax tricks and features. <br>
After trying our own language, however, we understood that a good markup language should not have various constructions. <br>
That's because source is much easier to read and edit, when you have a few patterns and all other syntax stored separately. <br>
Those 'old-fashioned' features are still available, but we don't recommend using them.
* js / css parsing - it's better to import code
```
parse js `console.log("JS parse")`
```
* local styles - it's better to style classes with css
```
local border "border: 1px solid"
local font "font-size: 40px"
# Element *div @border font.
```

# Contact
* [Roseinfire](https://github.com/Roseinfire)
* [ko-fi.com/Roseinfire](https://ko-fi.com/roseinfire)
* roseinfire.dev@gmail.com

# License
Distributed under `MIT` license.<br>
For detailed information read License file.

