![HtmlScript](https://raw.githubusercontent.com/Roseinfire/HtmlScript/main/Icon(500x500).png)
# Introduction
`HTML` is technology used everywhere on the web. <br>
However, it was written more than thirty years ago. <br>
In spite of updates, html is too old to be comfortable. <br>
HtmlScript is the decoration language above Html. <br>
Written to be `more` `flexible` and more `comfortable`

## Needed knowledge
* CSS 3.0
* basic HTML
  
# Installation
```HTML
<html>
    <head layout="center">
      <meta charset="utf-8">
     </head>
     <body>
      <script src="https://roseinfire.github.io/HtmlScript/begin.js"></script>
   </body>
</html>
```

 
# Usage
## Set up attributes
```HTML
<head layout="full">
<script type="htmlscript"></script>
</head>
```
> There are only five
### `layout`
General plan of your page. Related to `<head>`.<br>
Currently support three layouts:
* static `number`<br>
number shows width in pixels.
* relative `number` <br>
number shows width in pixels.
* fullscreen <br>
By default attribute set to `center`
### `style`
Style of hand element.<br>
Hand Element can be found in the console typing `hand` <br>
Related to `<head>` <br>
By default set to `border-radius: 15px; border: 1px dotted`
### `theme` 
Indicates background-color of the page.<br>
Related to `<head>`. By default set to `white`
### `background`
Attribute takes a url and indicates the background-image of your page. <br>
Related to `<head>`. By default not set.
### `fetch`
Specific attribute related to `<script>`. <br>
Fetch contains a link to code, if you would like to store it separately.<br>
By default not set.

## Inner code
### Just inside
```HTML
<script type="htmlscript"> ~ comment ~ </script>
```
* Comments should not be a part of another syntax.
### Creating style:
```javascript
local name "value"
```
#### works like variable
*  name: all chars exclude `space`, `"` and `.`
*  value: all chars exclude `"`
#### Example:
```javascript
local font "font-size:30px; text-align: center"
local border "border: 2px solid;"
```
### Creating an element:
```javascript
# Hello World! *type @font border.
```
* after `#` goes innerHTML, takes any value exclude `*`
* `type` takes classic tag name like `p` or `div`
* `font` and `border` are styles, defined like `local name "value"`

#### Character `@` is also a draw operator. Even if the style is not specified, `@.` must be marked.
```javascript
  # Element with no style *p @.
```
### Adding attributes:
```javascript
 #*img @. { className="image", id="example" }
```
* between brackets `{` and `}` mark attributes. Separate with `,`
* Note that you wrote properties, but not Html attributes.
### Relative sizes and groups:
```javascript
#*div @border. [margin proportion quantity]
```
#### Between brackets `[` and `]` mark the conditions. Separate arguments with spaces.
* margin from parent border (`0` by default)
* proportion - width/height (`1` by default)
* quantity - how many elements in group (`1` by default)
### Child nodes:
To specify child node, just begin command from `-`
```javascript
# *div @font.
     - # *div @.
     -- # Hello child nodes! *div @.
```
### External files:
```javascript
  import "root/code.js"
  import "root/style.css"
```
File action defined automatically by its extension. <br>
`.js` files become scripts <br>
`.css` files become styles <br>
## Congratulations! 
You finished a short course. <br>
Give the project a star, if you would like to see more features!
# Join development
The simplest way to take part in this project is write new Html layout.<br>
Read wiki to understand how to write additions. <br>
Create new branch, write your addition and apply for contribution.<br>
Note that you can take part in the discussion about new features. <br>


# Learn more
### About safety
Your page is built with HtmlScript, not HtmlScript built with your page. `This is a law.` <br>
If your page is built from a local file, it stays local. If your page is hosted on public domain, then it is public.<br>
Keep in mind that HtmlScript will not take responsibility, if you publish confidential information on the public server.<br>
When connect external scripts (include this one) you give it access to all your page.<br>
Be sure that you can trust the connected script. That's why the HtmlScript open code project. <br>
  
### About advertisement
HtmlScript itself `never use advertisement`. <br>
Anyone can use advertisements on his own site if it is built with HtmlScript. <br>
We believe that best support is to join the project or just give it a star. <br>
However, you can support HtmlScript financially on ko-fi. <br>

# Contact
##### [Roseinfire](https://github.com/Roseinfire)
##### [ko-fi.com/Roseinfire] (https://ko-fi.com/roseinfire)
##### 14box14@gmail.com


# License
Distributed under MIT license

