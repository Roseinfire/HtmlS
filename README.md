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
* Just one symbol adds spaces before stroke 🔭 
  
# Installation
Connect the script and let it do all the dirty jobs for you. <br>
Htmls compilates inside any `<script>` specified as `text/htmls` or just `htmls` <br>
```HTML
<script src="https://roseinfire.github.io/HtmlS/begin.js"></script>
```
# Syntax
> Let's begin from
### Comments
```javascript
~ Hello comments ~
```
* Comments should not be a part of another syntax
* Comments also appear in the console
> Create first element
### Elements
```javascript
# Hello World! *tag
```
* after `#` goes innerHTML, takes any value exclude `*`
* `tag` takes classic tag name like `p` or `div`
* add `!` before a command to not discard spaces from string

 > Specify class 
### Classes
```javascript
# Element with className *div .class
```
* add `.name` and element will have class attribute set to name
* exclude spaces from your class name
* one element may have any number of classes
    
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
* good practice is defining styles before begin the script
    
 > Don't forget attributes  
### Attributes
```javascript
 # *img { src "example.png" } { id "image" }
```
* between brackets `{` and `}` specify attributes
* separate id and value with `space`
* element may have any number of attributes

> Access more complexity with
### Nodes
```javascript
# *div .header
 -  # *div .firstChild
  --  # *div .secondChild
```
* to specify child node, begin command from minus
* the element appends to first node witch have one minus less
* any number of spaces can be used between "-"

> And much more complexity with
### Groups
```javascript
  # *div .square [margin proportion quantity] .container
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments with spaces
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in group (`1` by default)
* first class related to a single element
* second class related to container

> Connect other files
### External resources
To connect an external file, init source with `import` keyword. <br>
File action defined automatically by its extension.
```javascript
 import "root/code.js"
 import "root/style.css"
 import later "root/analitics.js"
```
* `js` files become scripts 
* `css` files become styles
* `later` word means don't stop building while loading script
*  `css` files are always loading quietly

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
 Means content occupies all the screen and not scrolling.
### `theme` 
Indicates color of `Loading..` string<br>
Related to `<head>`. By default set to `rgba(217, 210, 210, 0.6)`
### `image`
Attribute takes a url and indicates the background-image of your page. <br>
background-image also comes from style, but `image` is visible only after load. <br>
Related to `<body>`. By default not set.
### `fetch`
Specific attribute related to `<script type="htmls">`. <br>
Fetch contains a link to code, if you would like to store it separately.<br>
By default not set.

## Congratulations! 
You finished a short study. Give the project a star, if you like to support the project. <br>
Your support is really important!

# Development
The best way to take part in this project - `leave a comment` <br>
Just go to the discussions and write about what features you would like to see. <br>
Of course, there are no such things that never need to be better. <br>
So, you can take any part of the project and develop it. <br>
`Read` the `Contribution.js` file for the detailed information.

# Learn more
### About safety
You build a site with htmls, not htmls build a site for you. This is our rule. <br>
If your site is built from a local file, it stays local. `No data shared` from local files.<br>
If your site is hosted on a public server, then it is public. <br>
Keep in mind that HtmlS will not take responsibility, <br>
if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. That's why the HtmlS `open source` project.
  
### About advertisement
HtmlS itself `never use advertisement`. <br>
Everyone can use advertisements on his own site when it is built with htmls. <br>
We believe that best support is to join the project or just give it a star. <br>

### About installation
If your site is built with a cross-site script, it will not work when the script isn't accessible. <br>
So, the better idea is to download htmls to your project's folder. <br>
To run script from a folder, you need a special attribute `host` set to HtmlS path including the domain. <br>
Note that you also need to set localhost to test your site locally.
```HTML
<html host="https://website.com/path">
  <head>
     <script src="path/begin.js"></script>
  </head>
</html>
```
### About performance
Loading of Htmls usually takes about (0,3) sec. <br>
However, building a site may take significantly more time.

# Contact
* [Roseinfire](https://github.com/Roseinfire)
* [ko-fi.com/Roseinfire](https://ko-fi.com/roseinfire)
* roseinfire.dev@gmail.com

# License
Distributed under `MIT` license.<br>
For detailed information read License file.

