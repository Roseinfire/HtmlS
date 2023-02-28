# Intro
Both decoration and scripting language, <br>
Htmls is `more` `flexible` and more `comfortable` than html <br>
And does not require long installation

## Advantages

* Works nearly everywhere 🕸
* Quick start ⏳
* Human friendly syntax 🔎
* Inline layout 📝
* Built-in preload 🥽
* Reusable styles 🪴
* Fast css connection 🐇 
* Grouped elements 📚
* Automatically setting new stroke 🎬
* Just one symbol adds spaces to stroke 🔭 
  
# Installation
Language compilates inside any `<script>` specified as `text/htmls` or just `htmls` <br>
When its package connected of course.
```html
<script type=”htmls”></script>
```
```HTML
<script src="https://roseinfire.github.io/HtmlS/begin.js"></script>
```
# Guide
> and first look at
### Comments
```javascript
~ Hello Htmls ~
```
* Comments should not be a part of another syntax
* Comments also appear in the console
#
> Create first element
### Elements
```javascript
# Hello World! *tag
```
* write text between `#` and `*`, to write a star use `<*>`
* `tag` takes classic tag names like `p` or `div`
* add `!` before `#` to read all the spaces in text
#
 > Specify class 
### Classes
```javascript
# Element with className *div .class
```
* add `.name` and element will have class attribute set to name
* exclude spaces from your class name
* one element may have any number of classes
#
> Add a style
### Styles
```javascript
style bordered "border: 2px solid"
style block "width: 100px; height: 100px"
```
```javascript
# *div @bordered @block
```
* styles are reusable
* element may have any number of styles
* Good practice is defining styles before beginning the script
#   
 > Don't forget about 
### Attributes 
```javascript
 # *img { src "example.png" } { id "image" }
```
* between brackets `{` and `}` specify attributes
* separate id and value with `space`
* element may have any number of attributes
#
> Access more complexity with
### Nodes
```javascript
# *div .header
 -  # *div .firstChild
  --  # *div .secondChild
```
* to specify a child node, begin command from minus
* the element appends to the first node which has one minus less
* any number of spaces can be used between `-`
#
> And much more complexity with
### Groups
```javascript
  # *div .square [margin proportion quantity] .container
```
#### Between brackets `[` and `]` mark the conditions, separate arguments with spaces
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in a group (`1` by default)
* first class related to a single element
* second class related to a container
#
> Connecting scripts
### External files
To connect an external file, init source with `import` keyword <br>
File action defined automatically by its extension, <br>
While target of file defined by argument <br>

```javascript
 import "root/style.css"
 import module "modules/example.js"
 import now "root/defines.js"
 import later "scripts/analitics.js"
 import chain "scripts/preload.js"
 import chain "scripts/content.js"
```
* `js` files become scripts
* `css` files become styles
* `later` word means don't stop building while loading the script, while `now` means so (beta)
* `module` word declares load module with extension `.js` as well as `.mjs` (beta)
* `chain` means to load scripts at the same time, but execute one after another (beta)


## Setup
> Let's personalize your site
```HTML
<head layout="fullscreen">
  <script type="text/htmls" fetch="root/site.json"></script>
</head>
```
### `layout`
#
Resize plan of your site, css grids and other. <br>
Currently support three layouts:
* static `number`<br>
number shows width of content in pixels.
* relative `number`<br>
number shows screen percentage occupied by content.
* fullscreen <br>
 Means content occupies all the screen and not scrolling. <br>
#
 Attribute related to `<head>` <br>
#
 By default set to `relative 0.6`
#
 ```html
<!-- layout example --!>
<head layout="relative 0.6"></head>
```
#
### `image`
#
Attribute takes a url and indicates the background-image of your page. <br>
background-image also comes from style, but `image` is visible only after load. <br>
#
Attribute related to `<body>`
# 
By default not set
#
 ```html
<!-- image example --!>
<body image="background.png"></body>
```
#
### `fetch`
#
Specific attribute related to `htmls code` <br>
Fetch contains a link to code, if you would like to store it separately. <br>
Code from fetch builds elements like any other htmls code. <br>
#
Attribute related to `<script>`
#
By default not set
#
 ```html
<!-- fetch example --!>
<script fetch="index.json"></script>
```
#
### `theme`
#
Attribute defines text of preload. You can put any message including emoji.
#
Attribute related to `<head>`
#
By default, it is set to `Loading..`
#
 ```html
<!-- theme example --!>
<head theme="loading website"></head>
```
#

> Add even more personality with
## Styles
> htmls generated elements are styling with css
### Main container
Available with `.paper` css command
#
```css
.paper {
  background-color: white;
  border: 1px solid orange;
}
```
#
### Loading string 
Available with `.loading` css command
#
```css
.loading {
  color: pink;
  font-size: 14px;
}
```
#

> And finally 
## Congratulations!
You finished a short study. We are happy to help you create websites. <br>
Give the project a `star`, if you like the project!
#

# Learn more 
### About privacy
We `never tracking` nobody and never contribute to your website. <br>
You build a site with htmls, not htmls build a site for you. This is our rule. <br>
If your site is built from a local file, `no data shared` from local files. <br>
If your site is hosted on a public server, then it is public. <br>
Keep in mind that HtmlS will not take responsibility, <br>
if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. That's why the HtmlS `open source` project.
#
### About advertisement
HtmlS itself `never use advertisement` <br>
Everyone can use advertisements on his own site when it is built with htmls. <br>
We believe that best support is to join the project or just give it a star. <br>
#
### About installation
If your site is built with a cross-site script, it will not work when the script isn't accessible. <br>
So, the better idea is to download htmls to your project's folder 📩 <br>
It accesses to load quicker and not depend from us 🚀 <br>
To run script from a folder, you need a special attribute `host`<br>
set to HtmlS path including the domain. <br>
Note that you also may need to set localhost to test your site locally.
```HTML
<html host="https://website.com/path">
  <head>
     <script src="path/begin.js"></script>
  </head>
</html>
```
#
### About performance
Loading of Htmls usually takes about (0,3) sec. <br>
However, building a site may take significantly more time.
## Development
The best way to take part in this project - `leave a comment` <br>
Just go to the discussions and write about what features you would like to see. <br>
Of course, there are no such things that never need to be better. <br>
So, you can take any part of the project and develop it. <br>
`Read` the `Contribution.js` file for the detailed information.
#
# Contact
* [Roseinfire](https://github.com/Roseinfire)
* [ko-fi.com/Roseinfire](https://ko-fi.com/roseinfire)
* roseinfire.dev@gmail.com

# License
Distributed under `MIT` license.<br>
For detailed information read License file.



