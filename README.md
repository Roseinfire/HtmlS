![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/images/Icon(300x300).png)
# Introduction
Hyper Text Markup used everywhere on the web. <br>
Written more than thirty years ago, it is not so human friendly. <br>
HtmlS is the decoration language above html, which <br>
written to be `more` `flexible` and more `comfortable`

## Advantages

* No need to close tags
* No need css tricks
* Easy to set up a preload
* Easy to create elements group
* Easy to choose a content layout
  
# Installation
You need only connect the script. <br>
Then write inside `<script>` element or specify `fetch` attribute. <br>
```HTML
<html>
    <head>
      <meta charset="utf-8">
      <script type="htmlscript"></script>
     </head>
     <body>
      <script src="https://roseinfire.github.io/HtmlScript/begin.js"></script>
   </body>
</html>
```
# Usage
### Comments:
```javascript
~ comment ~
```
* Comments should not be a part of another syntax.
* Comments also appear in the console.

### Creating style:
```javascript
local name "value"
```
#### name works like variable
*  name: takes all chars exclude `space`, `"` and `.`
*  value: takes all chars exclude `"`
#### Example:
```javascript
local font "font-size: 30px; text-align: center"
local border "border: 2px solid"
```
### Creating an element:
```javascript
# Hello World! *type
```
* after `#` goes innerHTML, takes any value exclude `*`
* `type` takes classic tag name like `p` or `div`

### Adding styles:
```javascript
  # I'm styled! *p @font border.
```
* styles were defined with keyword `local`
* separate styles with `space`
* don't forget to add `.`

### Relative sizes and groups:
```javascript
  # *div @border. [margin proportion quantity]
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments with spaces.
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in group (`1` by default)

### Adding attributes:
```javascript
 # *img { className="image", id="example" }
```
* between brackets `{` and `}` mark attributes. Separate with `,`
* Note that you wrote properties, not Html attributes.
### Child nodes:
To specify child node, begin command from `-`
```javascript
 # *div @font.
   - # *div @border.
    -- # Hello child nodes! *div
```
### External files:
```javascript
 import "root/code.js"
 import "root/style.css"
```
File action defined automatically by its extension. <br>
`.js` files become scripts <br>
`.css` files become styles <br>

## Setup
### Use attributes to create your own style
```HTML
<head layout="fullscreen">
  <script type="htmlscript" fetch="root/site.json"></script>
</head>
```
### `style`
Style of `<body>` element is the same as in source html.
### `layout`
General plan of your page. Attribute related to `<head>`<br>
Currently support three layouts:
* static `number`<br>
number shows width of content in pixels.
* relative `number` <br>
number shows screen percentage occupied by content.
* fullscreen <br>
Have not any arguments.
### `style`
Defines style of element which holds content. Is not same to `<body>` element. <br>
Related to `<head>` <br>
By default set to `border-radius: 15px; border: 1px dotted; background-color: white`
### `theme` 
Indicates color of `Loading..` string<br>
Related to `<head>`. By default set to `rgba(217, 210, 210, 0.6)`
### `image`
Attribute takes a url and indicates the background-image of your page. <br>
background-image also comes from style, but `image` visible only after load. <br>
Related to `<body>`. By default not set.
### `fetch`
Specific attribute related to `<script type="htmlscript">`. <br>
Fetch contains a link to htmlscript, if you would like to store it separately.<br>
By default not set.

### Congratulations! 
You finished a short study. <br>
Give the project a star, if you would like to see more features!

# Join development
The best way to take part in this project - write an addition.<br>
Read project wiki to understand additions and code writing. <br>
Fork the project, write your addition and apply for contribution.<br>
Note that you also can take part in the discussion about new features. <br>

# Learn more
### About safety
Your site is built with HtmlScript, not HtmlScript built with your site. This is a law. <br>
If your site is built from a local file, it stays local. `No data shared` from local files.<br>
If your site is hosted on a public server, then it is public. <br>
Keep in mind that HtmlScript will not take responsibility, <br>
if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. <br>
That's why the HtmlScript `open code` project. <br>
  
### About advertisement
HtmlScript itself `never use advertisement`. <br>
Everyone can use advertisements on his own site when it is built with HtmlScript. <br>
We believe that best support is to join the project or just give it a star. <br>
However, you can support HtmlScript on Ko-fi. <br>

### About installation
If your site is built with cross-site script, it will not work when script isn't accessible. <br>
So, the better idea is install HtmlScript to your project's folder. <br>
To run script from a folder, you need a special attribute `host` set to HtmlScript path include the domain. <br>
Host also will work if you load the script directly from github not from github pages. <br>
Note that you also need to use localhost to test your site locally.
```HTML
<html host="https://website.com/path">
  <head>
     <script src="path/begin.js"></script>
  </head>
</html>
```
### About perfomance
We use coss-site `fetch` constructions, which slows down the load speed. <br>
In most browsers, the effect will disappear after the first load.  <br>
However, for more beautiful loading we recommend creating a `loading..` element on the source page.


# Contacts
* [Roseinfire](https://github.com/Roseinfire)
* [ko-fi.com/Roseinfire](https://ko-fi.com/roseinfire)
* 14box14@gmail.com

# License
Distributed under MIT license.<br>
For detailed information read License file.
