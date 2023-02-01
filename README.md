![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/images/Darkbean(300x300).png)
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
* Auto `<br>` (beta)
* Simplest way to add element class (beta)
  
# Installation
Connect the script and let it do all the dirty jobs for you. <br>
HtmlS compilates inside any `<script>` specified as `htmlscript` <br>
It's also possible to store htmls separately from html document.
```HTML
<html>
    <head>
      <meta charset="utf-8">
      <script type="htmlscript"></script>
     </head>
     <body>
      <script src="https://roseinfire.github.io/HtmlS/begin.js"></script>
   </body>
</html>
```
# Syntax
### Comments:
```javascript
~ comment ~
```
* Comments should not be a part of another syntax.
* Comments also appear in the console.

### Styles:
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
### Elements:
```javascript
# Hello World! *tag @font border.
```
* after `#` goes innerHTML, takes any value exclude `*`
* `tag` takes classic tag name like `p` or `div`
* styles were defined with keyword `local`
* separate styles with `space`
* don't forget to add `.` after styles.

### Groups:
```javascript
  # *div @border. [margin proportion quantity class] @font.
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments with spaces.
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in group (`1` by default)
* class - optional argument which defines node class name
* first style indicates style of `group`, while second style of `header`

### Attributes:
```javascript
 # *img { className="image", id="example" }
```
* Between brackets `{` and `}` specify attributes. Separate with `,`
* Note that you wrote properties, not Html attributes.
### Children nodes:
To specify child node, begin command from `-`
```javascript
 # *div @font.
   - # *div @border.
    -- # Hello children nodes! *div
```
### Insert code:
Use keyword `parse` to implement a short code.
```javascript
parse js `console.log("hello")`
parse css `body { color: peru }`
```
* specify language
* javascript and css both supported
* exclude sloped quotes

### External files:
To connect an external file, init source with `import` keyword. <br>
File action defined automatically by its extension.
```javascript
 import "root/code.js"
 import "root/style.css"
```
* `.js` files become scripts <br>
* `.css` files become styles <br>

## Setup
> Use attributes to create your own style
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
### `style`
Defines style of element which holds content. Is not the same as the `<body>` element. <br>
Related to `<head>` <br>
By default set to `padding: 0;`
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
Give the project a star, if you would like to see more features!

# Development
The best way to take part in this project - leave a comment.<br>
Just go to the discussions and write how would you like to write html <br>
or what features would you like to see in htmls. <br>
Also you can write a layout to help create beautiful sites. <br>
If you are an optimization specialist, welcome to the team.

# Learn more
### About safety
Your site is built with htmls, not htmls built with your site. This is our rule. <br>
If your site is built from a local file, it stays local. `No data shared` from local files.<br>
If your site is hosted on a public server, then it is public. <br>
Keep in mind that HtmlScript will not take responsibility, <br>
if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. That's why the HtmlS `open code` project.
  
### About advertisement
HtmlScript itself `never use advertisement`. <br>
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


# Contacts
* [Roseinfire](https://github.com/Roseinfire)
* [ko-fi.com/Roseinfire](https://ko-fi.com/roseinfire)
* 14box14@gmail.com

# License
Distributed under MIT license.<br>
For detailed information read License file.
